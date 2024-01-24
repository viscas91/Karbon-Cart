'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model } from 'sequelize';
import process from 'process';
import configJson from './config.json';

const basename = path.basename(__filename);
const env: string = process.env.NODE_ENV || 'development';
const config = (configJson as { [key: string]: any })[env];

interface ModelWithAssociate extends Model {
  associate?: (models: Record<string, Model>) => void;
}

const db: Record<string, typeof Model & ModelWithAssociate> = {};

const sequelize = config.url
  ? new Sequelize(config.url, { ...config, logging: false })
  : new Sequelize(config.database, config.username, config.password, { ...config, logging: false});

  (async () => {
    const files = fs.readdirSync(__dirname);
  
    for (const file of files) {
      if (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.ts' &&
        file.indexOf('.test.ts') === -1
      ) {
        const model = (await import(path.join(__dirname, file))).default(sequelize, DataTypes) as typeof Model & ModelWithAssociate;
        db[model.name] = model;
      }
    }
  });

Object.keys(db).forEach(modelName => {
  const model = db[modelName];
  if (model && model.associate) {
    model.associate(db);
  }
});

export { Sequelize, sequelize };

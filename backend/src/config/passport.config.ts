import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserType } from '../utils/types/common.types';
// import { db } from './db.config';
import { Password } from '../services/password';
import { User } from '../models/mysql/User';

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try{
    const user = await User.findOne({
      where: { username: username }
    });
  
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    const isValidPassword = await Password.compare(user.password, password);
    
    if (!isValidPassword) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  }catch(err){
    return done(err)
}
  })
);

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, (user as UserType).id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
      const u = await User.findByPk(id);
      console.log(u)
      const user = u?.get();

      if (!user) {
          // If the user is not found, pass null as the second argument
          done(null, null);
      } else {
          // If the user is found, pass the user as the second argument
          done(null, user);
      }
  } catch (error) {
      // If an error occurs during user retrieval, pass the error as the first argument
      done(error, null);
  }
});
import express from 'express';
import { getSiteSettings, updateSiteSettings } from '../controllers/site/siteSettings';

const router = express.Router();

router.get('/', getSiteSettings);
router.patch('/', updateSiteSettings);

export { router as SiteRouter };
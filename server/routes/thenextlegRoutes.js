import express from 'express';
import * as dotenv from 'dotenv';
import { TNL } from 'tnl-midjourney-api';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();
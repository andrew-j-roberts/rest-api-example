/**
 * PgClient.js
 * This is a basic example of a PostgreSQL client. 
 * This client lets us connect our REST API to the data in our AWS RDS instance.
 * 
 * @author Andrew Roberts
 */

import { Client } from 'pg';
import { PgConfig } from './pg.config';

export const PgClient = new Client(PgConfig);
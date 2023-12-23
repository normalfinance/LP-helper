/* eslint-env node */

// require('dotenv').config({ path: '.env.production' })
import 'dotenv/config';
// const child_process = require('child_process')
import child_process from 'child_process';
import fs from 'fs/promises';
import { promisify } from 'util';
// const fs = require('fs/promises')
// const { promisify } = require('util')

// const thegraphConfig = require('../graphql.config')
import config from '../graphql.config.js';

const exec = promisify(child_process.exec);

function fetchSchema(url, outputFile) {
	console.log(outputFile);
	exec(
		`npx --silent get-graphql-schema --h Origin=https://app.normalfinance.io ${url}`,
	)
		.then(({ stderr, stdout }) => {
			if (stderr) {
				throw new Error(stderr);
			} else {
				fs.writeFile(outputFile, stdout);
			}
		})
		.catch((err) => {
			console.error(err);
			console.error(`Failed to fetch schema from ${url}`);
		});
}

fetchSchema(process.env.THE_GRAPH_SCHEMA_ENDPOINT, config.schema);

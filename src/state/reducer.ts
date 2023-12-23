import { combineReducers } from '@reduxjs/toolkit';
import localForage from 'localforage';
import { PersistConfig, persistReducer } from 'redux-persist';
import { isDevelopmentEnv } from '../utils/env';

import application from './application/reducer';
import lists from './lists/reducer';
import { customCreateMigrate, migrations } from './migrations';
const persistedReducers = {
	//   user,
	//   transactions,
	//   signatures,
	lists,
};

const appReducer = combineReducers({
	application,
	...persistedReducers,
});

export type AppState = ReturnType<typeof appReducer>;

const persistConfig: PersistConfig<AppState> = {
	key: 'interface',
	version: 6, // see migrations.ts for more details about this version
	storage: localForage.createInstance({
		name: 'redux',
	}),
	migrate: customCreateMigrate(migrations, { debug: false }),
	whitelist: Object.keys(persistedReducers),
	throttle: 1000, // ms
	serialize: false,
	// The typescript definitions are wrong - we need this to be false for unserialized storage to work.
	// We need unserialized storage for inspectable db entries for debugging.
	// @ts-ignore
	deserialize: false,
	debug: isDevelopmentEnv(),
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export default persistedReducer;

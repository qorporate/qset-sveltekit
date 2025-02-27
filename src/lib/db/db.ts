import Dexie, { type EntityTable, type Table } from 'dexie';

export interface Feedback {
	id: string;
	name: string;
	email: string;
	message: string;
	receiver: string;
	timestampInUtcString: string;
}

const db = new Dexie('FeedbackDB') as Dexie & {
	feedback: EntityTable<
		Feedback,
		'id' // primary key "id" (for the typings only)
	>;
};

db.version(1).stores({
	feedback: '++id, name, email, message, receiver, timestampInUtcString'
});

export { db };

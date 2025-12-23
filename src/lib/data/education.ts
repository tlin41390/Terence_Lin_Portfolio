import Assets from './assets';
import type { Education } from '../types';


export const items: Array<Education> = [
	{
		degree: 'Bachelor degree of Computer Science',
		description: '',
		location: 'San Francisco, CA',
		logo: Assets.USFCA,
		name: '',
		organization: 'USFCA',
		color: 'green',
		period: { from: new Date(2019, 7, 1), to: new Date(2023, 6, 1) },
		shortDescription: '',
		slug: 'dummy-education-item',
		subjects: ['C', 'Algorithm', 'Python', 'Java','Operating Systems','Data Visualization', 'Computer Networks','Software Development']
	},
	{
		degree: 'Master degree Information Systems',
		description: '',
		color: 'red',
		location: 'Santa Clara, CA',
		logo: Assets.SCU,
		name: '',
		organization: 'SCU',
		period: { from: new Date(2025, 0, 6) },
		shortDescription: '',
		slug: 'dummy-education-item-2',
		subjects: ['Artificial Intelligence','Databases', 'Cloud Computing Architecture', 'Data Analytics', 'Strategy and Management']
	}
];

export const title = 'Education';

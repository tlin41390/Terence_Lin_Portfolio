import Assets from './assets';
import { getSkills } from './skills';
import { ContractType, type Experience } from '../types';

export const items: Array<Experience> = [
	{
		slug: 'Full-Stack-Developer',
		company: 'Bridging-Tech',
		description:
			'During my time at Bridging-Tech, I enhanced web application efficiency by 15% through React Router implementation, improving user navigation across the learning platform. I established a Microsoft Azure backend server that increased user insights by 20% by effectively storing and managing activity data. By creating intuitive React and TypeScript components, I improved user engagement by 10% and provided easier access to learning materials. I also contributed to software reliability and performance through active participation in troubleshooting sessions, where my strong interpersonal skills enabled effective collaboration with team members.',
		contract: ContractType.Internship,
		type: 'Software Development',
		location: 'Home',
		period: { from: new Date() },
		skills: getSkills('ts', 'js', 'react'),
		name: 'Full-Stack-Developer',
		color: 'blue',
		links: [],
		logo: Assets.BridgingTech,
		shortDescription:
			'Creating and designing UI for the application as well as connecting users to a Supabase database.'
	},
	{
		slug: 'Computer Science Tutor',
		company: 'University of San Francisco',
		description: 'Creating awesome applications for customers.',
		contract: ContractType.Seasonal,
		type: 'Software Development',
		location: 'San Francisco',
		period: { from: new Date(2024, 8, 1) },
		skills: getSkills('c', 'java', 'css', 'html', 'js'),
		name: 'Computer Science Tutor',
		color: 'green',
		links: [],
		logo: Assets.USFCA,
		shortDescription: 'Lending a helping hand to students in need'
	},
	{
		slug: 'Data Engineer Intern',
		company: 'University of San Francisco',
		description:
			'As a Data Engineer Intern at the University of San Francisco, I performed ETL (Extract Transform Load) operations for a smartwatch company using Pandas, while developing and tuning machine learning models to analyze correlations between heart rate, age, gender, and photoplethysmogram data from smartwatch users. I enhanced project outcomes by leveraging strong communication skills and deep learning expertise to collaborate with professors on large-scale prototypes. My contributions to the decision-making processes regarding large-scale data science projects helped ensure successful project outcomes.',
		contract: ContractType.Seasonal,
		type: 'Software Development',
		location: 'Home',
		period: { from: new Date(2021, 0, 1), to: new Date(2022, 5, 6) },
		skills: getSkills('css', 'html', 'js'),
		name: 'Data Engineer Intern',
		color: 'green',
		links: [],
		logo: Assets.USFCA,
		shortDescription: 'Helping and Learning ETL and machine learning'
	},
	{
		slug: 'Front-End Engineer Intern',
		company: 'SolarFi',
		description:
			"At SolarFi, I enhanced user experience by utilizing Figma for product design in the development of a prototype for an emergency web application, focusing on disaster alerts and emergency preparation. I implemented the prototype for the login page, news alerts, and disaster preparation features using React.js and Tailwind CSS. Through conducting usability testing with diverse user groups during the testing phase, I increased the application's ease of use and reliability by 30% by incorporating feedback and constructive criticism on product features.",
		contract: ContractType.Internship,
		type: 'Software Development',
		location: 'Home',
		period: { from: new Date(2022, 10, 1), to: new Date(2023, 2, 1) },
		skills: getSkills('css', 'html', 'js','react','figma'),
		name: 'Front End Developer Intern',
		color: 'orange',
		links: [],
		logo: Assets.SolarFi,
		shortDescription: 'Creating web application designs for SolarFi'
	}
];

export const title = 'Experience';

import { Platform } from '$lib/types';
import { getSkills } from './skills';

export const title = 'Home';

export const name = 'Terence';

export const lastName = 'Lin';

export const description =
	`Welcome to my website! Hi, I’m Terence Lin, a full-stack developer passionate about building applications. 🚀From a young age, I was fascinated by programming, spending countless hours on the computer. 💻 This curiosity led me to explore how technology works under the hood, shaping my journey into software development. In my free time, I enjoy playing video games 🎮 and watching basketball 🏀, football 🏈, and baseball ⚾. Lately, I’ve been diving deeper into artificial intelligence and machine learning, focusing on building predictive models for sports analytics. Additionally, I’m collaborating with a non-profit to develop an exciting new application.Thanks for stopping by—I’d love to connect! 😊`;

export const links: Array<{ platform: Platform; link: string }> = [
	{ platform: Platform.GitHub, link: 'https://github.com/tlin41390' },
	{
		platform: Platform.Linkedin,
		link: 'https://www.linkedin.com/'
	},
	{
		platform: Platform.Email,
		link: 'linterences@gmail.com'
	},
	
];

export const skills = getSkills('js', 'css', 'html', 'reactjs', 'sass', 'svelte', 'ts','python','java','c','sql','azure','aws');

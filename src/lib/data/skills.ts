import Assets from './assets';
import type { Skill, SkillCategory } from '../types';
import { omit, type StringWithAutoComplete } from '@riadh-adrani/utils';

const defineSkillCategory = <S extends string>(data: SkillCategory<S>): SkillCategory<S> => data;

const categories = [
	defineSkillCategory({ name: 'Programming Languages', slug: 'pro-lang' }),
	defineSkillCategory({ name: 'Frameworks', slug: 'framework' }),
	defineSkillCategory({ name: 'Libraries', slug: 'library' }),
	defineSkillCategory({ name: 'Langauges', slug: 'lang' }),
	defineSkillCategory({ name: 'Databases', slug: 'db' }),
	defineSkillCategory({ name: 'ORMs', slug: 'orm' }),
	defineSkillCategory({ name: 'DevOps', slug: 'devops' }),
	defineSkillCategory({ name: 'Testing', slug: 'test' }),
	defineSkillCategory({ name: 'Dev Tools', slug: 'devtools' }),
	defineSkillCategory({ name: 'Markup & Style', slug: 'markup-style' }),
	defineSkillCategory({ name: 'Design', slug: 'design' }),
	defineSkillCategory({ name: 'Soft Skills', slug: 'soft' })
] as const;

const defineSkill = <S extends string>(
	skill: Omit<Skill<S>, 'category'> & {
		category?: StringWithAutoComplete<(typeof categories)[number]['slug']>;
	}
): Skill<S> => {
	const out: Skill<S> = omit(skill, 'category');

	if (skill.category) {
		out.category = categories.find((it) => it.slug === skill.category);
	}

	return out;
};

export const items = [
	defineSkill({
		slug: 'python',
		color: 'blue',
		description:
			'I have extensive experience with Python, using it for a variety of purposes. My work includes data processing, where I’ve utilized libraries like Pandas and NumPy to clean, manipulate, and analyze datasets. Additionally, I’ve worked on creating large language models (LLMs) and machine learning models, applying Python’s rich ecosystem of frameworks like TensorFlow and PyTorch. Beyond development, I also use Python for interview preparation, practicing algorithms and problem-solving skills with resources like LeetCode and HackerRank. Python’s versatility and readability make it an ideal language for both my professional and personal projects.',
		logo: Assets.Python,
		name: 'Python',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'c',
		color: 'skyblue',
		description:
			'I have hands-on experience with C, having worked on several large projects that deepened my understanding of system-level programming. One of the key projects I developed was a memory allocator, which involved intricate knowledge of dynamic memory allocation techniques. Additionally, I created a program capable of detecting network compression among different virtual machines (VMs), giving me experience with low-level networking concepts. I also worked within the xv6 kernel, which allowed me to explore operating system principles and gain deeper insights into how kernels manage resources. My passion for dynamic memory allocation continues to drive my interest in system optimization and resource management.',
		logo: Assets.C,
		name: 'C',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'java',
		color: 'skyblue',
		description:
			'I have gained a solid foundation in Java through my studies, where I’ve worked on various projects that helped deepen my understanding of the language. One of my key accomplishments is developing a multi-threaded, full-stack search engine in Java, which involved both front-end and back-end development. This project gave me hands-on experience with Java’s concurrency features and its ability to handle multiple tasks simultaneously, enhancing performance and scalability. Additionally, I’ve worked on several school projects that allowed me to apply Java in different contexts, strengthening my problem-solving skills and enhancing my ability to write clean, maintainable code.',
		logo: Assets.Java,
		name: 'Java',
		category: 'pro-lang'
	}),

	defineSkill({
		slug: 'js',
		color: 'yellow',
		description:
			'I have extensive experience with JavaScript, CSS, and HTML, which I have used to build various web applications. One of my notable projects includes creating a GPU visualizer that tracks GPU stock and prices, giving me hands-on experience in developing dynamic and interactive web interfaces. These technologies have been foundational in my journey through web development, allowing me to create responsive, user-friendly applications.',
		logo: Assets.JavaScript,
		name: 'Javascript',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'ts',
		color: 'blue',
		description:
			`I have also gained significant experience with TypeScript, particularly in developing web applications. During my apprenticeship, I worked with TypeScript and React to build scalable and maintainable applications. One standout project was focused on helping Alzheimer's patients, where I used TypeScript, React, and Next.js to build a web app tailored to their needs. TypeScript's strong typing system enhanced the reliability and maintainability of the codebase in these projects`,
		logo: Assets.TypeScript,
		name: 'Typescript',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'css',
		color: 'blue',
		description:
			'I have extensive experience with JavaScript, CSS, and HTML, which I have used to build various web applications. One of my notable projects includes creating a GPU visualizer that tracks GPU stock and prices, giving me hands-on experience in developing dynamic and interactive web interfaces. These technologies have been foundational in my journey through web development, allowing me to create responsive, user-friendly applications.',
		logo: Assets.CSS,
		name: 'CSS',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'html',
		color: 'orange',
		description:
			'I have extensive experience with JavaScript, CSS, and HTML, which I have used to build various web applications. One of my notable projects includes creating a GPU visualizer that tracks GPU stock and prices, giving me hands-on experience in developing dynamic and interactive web interfaces. These technologies have been foundational in my journey through web development, allowing me to create responsive, user-friendly applications.',
		logo: Assets.HTML,
		name: 'HTML',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'sass',
		color: 'pink',
		description:
			'I have experience using Sass during my capstone project, which helped me take my CSS skills to the next level. Sass is a powerful CSS preprocessor that allowed me to write more efficient and maintainable stylesheets. By leveraging features like variables, nesting, mixins, and inheritance, I was able to streamline the design process and reduce code duplication. Compared to traditional CSS, Sass provides enhanced flexibility, modularity, and reusability, making it easier to manage complex stylesheets in larger projects. This experience taught me the advantages of using Sass to improve both productivity and scalability in web development.',
		logo: Assets.Sass,
		name: 'Sass',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'reactjs',
		color: 'cyan',
		description:
			'React has been a core tool in my web development journey, allowing me to create dynamic user interfaces with reusable components. I’ve used React extensively in various projects, including during my apprenticeship, where I worked on building complex web applications. My experience with React has given me a solid understanding of component-based architecture and state management	',
		logo: Assets.ReactJs,
		name: 'React Js',
		category: 'library'
	}),
	defineSkill({
		slug: 'svelte',
		color: 'orange',
		description: `This website 😊`,
		logo: Assets.Svelte,
		name: 'Svelte',
		category: 'library'
	})
] as const;

export const title = 'Skills';

export const getSkills = (
	...slugs: Array<StringWithAutoComplete<(typeof items)[number]['slug']>>
): Array<Skill> => items.filter((it) => slugs.includes(it.slug));

export const groupByCategory = (
	query: string
): Array<{ category: SkillCategory; items: Array<Skill> }> => {
	const out: ReturnType<typeof groupByCategory> = [];

	const others: Array<Skill> = [];

	items.forEach((item) => {
		if (query.trim() && !item.name.toLowerCase().includes(query.trim().toLowerCase())) return;

		// push to others if item does not have a category
		if (!item.category) {
			others.push(item);
			return;
		}

		// check if category exists
		let category = out.find((it) => it.category.slug === item.category?.slug);

		if (!category) {
			category = { items: [], category: item.category };

			out.push(category);
		}

		category.items.push(item);
	});

	if (others.length !== 0) {
		out.push({ category: { name: 'Others', slug: 'others' }, items: others });
	}

	return out;
};

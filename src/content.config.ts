import { defineCollection } from 'astro:content'
import { CATEGORIES } from '@/data/categories'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z.string(),
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			heroImage: image(),
			category: z.enum(CATEGORIES),
			tags: z.array(z.string()),
			draft: z.boolean().default(false),
		})
})

export const collections = { blog }

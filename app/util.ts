import slug from 'slug'

export const slugifyObject = <T>(obj: T, prop = 'name') => ({
	...obj,
	slug: slug(obj[prop] || ''),
})

export const randomItem = <T>(items: T[]): T | undefined =>
	items[Math.floor(Math.random() * items.length)]


export const moneyFormat = (value: number) =>
	new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value)

export const includesSet = (a: any[], b: any[]) => a.every(x => b.includes(x))

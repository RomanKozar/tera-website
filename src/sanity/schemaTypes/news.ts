import { defineField, defineType } from "sanity";

export const newsType = defineType({
  name: "news",
  title: "Новини",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заголовок",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug / URL",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Дата публікації",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Короткий опис",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "Головне фото",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt-текст",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Текст новини",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt-текст",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "status",
      title: "Статус",
      type: "string",
      initialValue: "draft",
      options: {
        list: [
          { title: "Чернетка", value: "draft" },
          { title: "Опубліковано", value: "published" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "mainImage",
    },
  },
});

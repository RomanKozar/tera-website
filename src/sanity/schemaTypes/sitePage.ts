import { defineField, defineType } from "sanity";

export const sitePageType = defineType({
  name: "sitePage",
  title: "Сторінки сайту",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Назва сторінки",
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
    }),
    defineField({
      name: "body",
      title: "Текст сторінки",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
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
});

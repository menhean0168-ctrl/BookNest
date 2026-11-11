import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookCard from '../BookCard.vue'
import type { Book } from '@/types'

const book: Book = {
  id: 1,
  title: 'The Alchemist',
  author: 'Paulo Coelho',
  description: '',
  year: 1988,
  coverUrl: '',
  status: 'approved',
  categoryId: 1,
  suggestedById: null,
}

describe('BookCard', () => {
  it('shows the book and emits select with its id', async () => {
    const wrapper = mount(BookCard, { props: { book, categoryName: 'Fiction' } })
    expect(wrapper.text()).toContain('The Alchemist')
    await wrapper.trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual([1])
  })
})

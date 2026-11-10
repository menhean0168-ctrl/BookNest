import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookCard from '../BookCard.vue'
import { books } from '@/data/books'

describe('BookCard', () => {
  it('shows the book and emits select with its id', async () => {
    const wrapper = mount(BookCard, { props: { book: books[0]!, categoryName: 'Fiction' } })
    expect(wrapper.text()).toContain('The Alchemist')
    await wrapper.trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual([1])
  })
})

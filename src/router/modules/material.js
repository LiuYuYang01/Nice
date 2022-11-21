import Layout from '@/layout'

export default {
  path: '/material',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/material/index'),
      meta: { title: '资源', icon: 'icon-Union-1' }
    }
  ]
}

import Layout from '@/layout'

export default {
  path: '/write',
  component: Layout,
  meta: { title: '创作', icon: 'icon-chuangzuo' },
  children: [
    {
      path: 'write',
      component: () => import('@/views/write/index'),
      meta: { title: '发布笔记', size: '14px', left: '40px' }
    },
    {
      path: 'ceshi',
      component: () => import('@/views/write/ceshi/index'),
      meta: { title: '测试路由', size: '14px', left: '40px' }
    }
  ]
}

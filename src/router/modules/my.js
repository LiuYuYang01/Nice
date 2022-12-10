import Layout from '@/layout'

export default {
  path: '/my',
  component: Layout,
  hidden: true,
  children: [
    {
      path: '',
      component: () => import('@/views/my/index'),
      meta: { title: '个人设置', icon: '' }
    }
  ]
}

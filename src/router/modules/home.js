import Layout from '@/layout'

export default {
  path: '/',
  component: Layout,
  redirect: '/home',
  children: [
    {
      path: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '仪表盘', icon: 'icon-zhuye' }
    }
  ]
}

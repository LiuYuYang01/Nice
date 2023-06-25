import Layout from '@/layout'

export default {
  path: '/extend',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/extend/index'),
      meta: { title: '扩展', icon: 'icon-icon_yingyongguanli' }
    }
  ]
}

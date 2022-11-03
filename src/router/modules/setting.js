import Layout from '@/layout'

export default {
  path: '/setting',
  component: Layout,
  meta: { title: '设置', icon: 'icon-31shezhi' },
  children: [
    {
      path: '',
      component: () => import('@/views/setting/index'),
      meta: { title: '系统配置', size: '14px', left: '40px' }
    },
    {
      path: 'web',
      // component: () => import('@/views/write/ceshi/index'),
      component: () => import('@/views/setting/webConfig/index'),
      meta: { title: '网站设置', size: '14px', left: '40px' }
    }
  ]
}

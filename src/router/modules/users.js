import Layout from '@/layout'

export default {
  path: '/users',
  component: Layout,
  meta: { title: '用户', icon: 'icon-wode' },
  children: [
    {
      path: '',
      component: () => import('@/views/users/usersList/index'),
      meta: { title: '用户列表', size: '14px', left: '40px' }
    },
    {
      path: 'web',
      // component: () => import('@/views/write/ceshi/index'),
      component: () => import('@/views/setting/webConfig/index'),
      meta: { title: '用户权限', size: '14px', left: '40px' }
    },
    {
      path: 'role',
      // component: () => import('@/views/write/ceshi/index'),
      component: () => import('@/views/users/role/index'),
      meta: { title: '用户角色', size: '14px', left: '40px' }
    }
  ]
}

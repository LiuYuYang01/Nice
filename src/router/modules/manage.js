import Layout from '@/layout'

export default {
  path: '/manage',
  component: Layout,
  meta: { title: '管理', icon: 'icon-changjingguanli' },
  children: [
    // {
    //   path: '',
    //   component: () => import('@/views/setting/index'),
    //   meta: { title: '管理中心', size: '14px', left: '40px' }
    // },
    {
      path: 'article',
      component: () => import('@/views/manage/article/index'),
      meta: { title: '文章管理', size: '14px', left: '40px' }
    },
    {
      path: 'comment',
      component: () => import('@/views/manage/comment/index'),
      meta: { title: '评论管理', size: '14px', left: '40px' }
    },
    {
      path: 'cate',
      component: () => import('@/views/manage/cate/index'),
      meta: { title: '分类管理', size: '14px', left: '40px' }
    },
    {
      path: 'url',
      component: () => import('@/views/manage/url/index'),
      meta: { title: '友联管理', size: '14px', left: '40px' }
    },
    {
      path: 'tag',
      component: () => import('@/views/manage/tab/index'),
      meta: { title: '标签管理', size: '14px', left: '40px' }
    },
    {
      path: 'banner',
      component: () => import('@/views/manage/banner/index'),
      meta: { title: '轮播图管理', size: '14px', left: '40px' }
    }
  ]
}

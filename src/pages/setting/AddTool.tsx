import { Button, Form, Input, message } from 'antd'
import { lazyLoad, ConfigRoute } from '@/router/routes'
import { useGlobalStore } from '@/store/globalStore'

export type FieldType = {
  url: string
  name: string
  path: string
}

// todo: 考虑菜单图标怎么引入，建一个图标选择器？

export default function AddTool() {
  const { routesState, updateRoutesState } = useGlobalStore()

  const onFinish = (toolInfo: FieldType) => {
    // 更新侧边栏
    const newToolInfo: ConfigRoute = {
      path: toolInfo.path,
      name: toolInfo.name,
      url: toolInfo.url,
      component: () => lazyLoad(toolInfo.url)
    }
    updateRoutesState([...routesState, newToolInfo])
    message.success('添加成功~')
  }

  return (
    <>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} onFinish={onFinish} autoComplete="off">
        <Form.Item<FieldType>
          label="工具链接"
          name="url"
          rules={[
            {
              required: true,
              pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
              message: '请输入正确的链接~'
            }
          ]}
        >
          <Input placeholder="请输入您想要添加的工具网页链接~" />
        </Form.Item>
        <Form.Item<FieldType>
          label="工具名称"
          name="name"
          rules={[{ required: true, message: '请输入想要设置的名称~' }]}
        >
          <Input placeholder="请输入您想要最终展示的工具名称~" />
        </Form.Item>
        <Form.Item<FieldType>
          label="自定义路径"
          name="path"
          rules={[{ required: true, message: '请输入使用的访问路径~' }]}
        >
          <Input placeholder="请输入您想要使用的访问路径~" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

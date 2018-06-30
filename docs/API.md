# QR-Meals-SE API 文档

## 通用规则

本 API 尽可能遵循 RESTful API 规范，但可能在某些方面因实现难度进行一定妥协

API 参考 [RESTful API 设计指南 (by 阮一峰)](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)，设计基本符合所述规范，如 **状态码**、**动词意义**、**返回结果** 等，将基本符合该博客所述标准

认证: 将 `X-token` 字段，放在 HTTP Header 中作为认证凭据

## `/auth` 认证服务

|method|简述|所有角色|
|-|-|-|
|GET   |获取当前登录状态|:white_check_mark:|
|POST  |发送登录请求|:white_check_mark:|
|DELETE|发送登出请求|:white_check_mark:|

成功返回 200

失败返回 401

### GET

成功返回:
data中是staff信息
键表示restaurant_id；值是对象，其中有 `post` 和 `name` 两个字段，表示该用户在某家店的职位和名字
```json
{
	"msg": "已认证",
	"data": {
		"1": {
			"post": "waiter",
			"name": "小明"
		}
	}
}
```

### POST

请求:
```json
{
	"username": "username-here",
	"passowrd": "password-here"
}
```

成功返回 (status: 200):
```json
{
	"msg": "认证成功"
}
```
同时设置两个cookie，分别是 `qr-meals-session` 和 `qr-meals-session.sig`

### DELETE

成功返回:
```json
{
	"msg": "登出成功"
}
```

## `/restaurant` 餐馆资源

|method|简述|所有角色|管理者|
|-|-|-|-|
|GET   |获取餐馆列表|:white_check_mark:|:white_check_mark:|

<del>|POST  |创建餐馆|-|:white_check_mark:|</del>

### GET

成功返回:
```json
{
	"data": [
		{
			"restaurant_id": 1,
			"name": "美国Darsk♂饭店",
			"description": "Deep, Dark and Fatastic",
			"location": "Dungeon aaaa"
		},
		...
	],
	"msg": "查询成功"
}
```

### `/restaurant/:restaurant_id` 某餐馆资源

|method|简述|所有角色|管理者|
|-|-|-|-|
|GET   |获取餐馆信息|:white_check_mark:|:white_check_mark:|
|PUT |修改餐馆信息|-|:white_check_mark:|

<del>|DELETE|删除餐馆|-|:white_check_mark:|</del>

**GET `/restaurant/:restaurant_id/qrcode`** : 获取餐馆二维码

#### GET

GET /restaurant/1

成功返回:

```json
{
	"data": {
		"restaurant_id": 1,
		"name": "美国Dark♂饭店",
		"description": "Deep, Dark and Fatastic",
		"location": "Dungeon aaaa"
	},
	"msg": "查询成功"
}
```

#### PUT

PUT /restaurant/1

请求:

```json
{
	"name": "美国Dark♂饭店",
	"description": "Deep, Dark and Fatastic",
	"location": "Dungeon aaaa"
}
```

返回:

```json
{
	"msg": "店家信息更新成功"
}
```

### `/restaurant/:restaurant_id/menu` 菜单资源

|method|简述|所有角色|管理者|
|-|-|-|-|
|GET   |获取菜单列表|:white_check_mark:|:white_check_mark:|
|POST  |增加菜式|-|:white_check_mark:|

### `/restaurant/:restaurant_id/menu/:meal_id` 菜单菜式资源

|method|简述|所有角色|管理者|
|-|-|-|-|
|GET   |获取菜式详情|:white_check_mark:|:white_check_mark:|
|PUT |修改菜式详情|-|:white_check_mark:|
|DELETE|删除菜式|-|:white_check_mark:|

**GET `/restaurant/:restaurant_id/menu/:meal_id/qrcode`** : 获取菜式二维码

### `/restaurant/:restaurant_id/order` 订单资源

|method|简述|服务员/后厨|顾客|管理者|
|-|-|-|-|-|
|GET   |获取订单列表|获取该餐馆的所有订单|获取自己在该餐馆的订单|获取该餐馆的所有订单|
|POST  |创建订单|-|:white_check_mark:|:white_check_mark:|

### `/restaurant/:restaurant_id/order/:order_id` 某订单资源

|method|简述|服务员/后厨|顾客|管理者|
|-|-|-|-|-|
|GET|获取订单详情|:white_check_mark:|只能获取自己的订单详情|:white_check_mark:|
|PUT|修改订单信息|-|修改自己的订单信息|:white_check_mark:|
|DELETE|删除订单|-|删除自己的订单|:white_check_mark:|

### `/restaurant/:restaurant_id/order/:order_id/meal` 某订单菜式资源

|method|简述|服务员/后厨|顾客|管理者|
|-|-|-|-|-|
|GET|获取菜式列表|:white_check_mark:|获取自己订单的菜式列表|:white_check_mark:|
|POST|增加菜式|-|在自己订单中增加菜式|:white_check_mark:|

### `/restaurant/:restaurant_id/order/:order_id/meal/:order_meal_id` 订单菜式资源

|method|简述|服务员/后厨|顾客|管理者|
|-|-|-|-|-|
|GET|获取订单菜式信息|:white_check_mark:|获取自己订单的菜式信息|:white_check_mark:|
|PUT|修改订单菜式信息|-|修改自己订单的菜式信息|:white_check_mark:|
|DELETE|删除订单菜式|-|删除自己订单的菜式|:white_check_mark:|

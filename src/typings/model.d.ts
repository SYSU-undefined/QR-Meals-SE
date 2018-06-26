declare module 'qrse' {
  interface Staff {
    staff_id : string
    restaurant_id : number
    authority : number
    name : string
  }

  interface Admin {
    admin_id : number
    username : string
    password : string
    staff : Staff
  }

  interface Restaurant {
    restaurant_id : number
    name : string
    location : string
  }

  interface Dish {
    dish_id : number
    name : string
    description : string
    restaurant_id : number
    price : number
  }

  interface Order {
    order_id : number
    restaurant_id : number
    customer_id : string
    item_count : number
    total_price : number
    desk_id : number
    created_at : Date
  }

  interface OrderItem {
    item_id : number
    order_id : number
    dish_id : number
    unit_price : number
    quantity : number
    item_price : number
  }

  interface Desk {
    desk_id : number
    restaurant_id : number
    description : string
  }
}
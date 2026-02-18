
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './page/home/home';
import { Login } from './page/login/login';
import { Dashboard } from './page/dashboard/dashboard';
import { DashRoot } from './page/dashboard/dash-root/dash-root';
import { Customer } from './page/dashboard/customer/customer';
import { Item } from './page/dashboard/item/item';
import { Order } from './page/dashboard/order/order';



export const routes: Routes = [
  {
    path: "",
    component: Home,
  },
  {
    path: "login",
    component: Login

  },
  {
    path: "dashboard",
    component: Dashboard,
    children: [
      {
        path: "",
        component: DashRoot
      },
      {
        path: "customer",
        component: Customer
      },
      {
        path: "item",
        component: Item
      },
      {
        path: "order",
        component: Order
      }
    ]
  }

];

import Vue from "vue"
import VueRouter from 'vue-router'
import CreateTypePage from "@/components/page/CreateTypePage.vue"
import Inventory from "@/components/page/Inventory"
import LandingPage from "@/components/page/LandingPage.vue"

import MaterialOverview from "@/components/page/material/Overview.vue"
import MaterialEdit from "@/components/page/material/Edit.vue"

import MintOverview from "@/components/page/mint/Overview.vue"
import MintEdit from "@/components/page/mint/Edit.vue"

import HonorificOverview from "@/components/page/honorific/Overview.vue"
import HonorificEdit from "@/components/page/honorific/Edit.vue"

import TitleOverview from "@/components/page/title/Overview.vue"
import TitleEdit from "@/components/page/title/Edit.vue"

import PersonOverview from "@/components/page/person/Overview.vue"
import PersonEdit from "@/components/page/person/Edit.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage
  }, {
    path: '/type/create',
    name: 'CreateTypePage',
    component: CreateTypePage
  }, {
    path: "/material",
    name: "Material",
    component: MaterialOverview
  }, {
    path: "/material/create",
    name: "CreateMaterial",
    component: MaterialEdit
  }, {
    path: "/material/:id?",
    name: "UpdateMaterial",
    component: MaterialEdit
  }, {
    path: "/mint",
    name: "Mint",
    component: MintOverview
  }, {
    path: "/mint/create",
    name: "CreateMint",
    component: MintEdit
  }, {
    path: "/mint/:id?",
    name: "UpdateMint",
    component: MintEdit
  }, {
    path: "/person",
    name: "Person",
    component: PersonOverview
  }, {
    path: "/person/create",
    name: "CreatePerson",
    component: PersonEdit
  }, {
    path: "/person/:id?",
    name: "UpdatePerson",
    component: PersonEdit
  }, {
    path: "/title",
    name: "Title",
    component: TitleOverview
  }, {
    path: "/title/create",
    name: "CreateTitle",
    component: TitleEdit
  }, {
    path: "/title/:id?",
    name: "UpdateTitle",
    component: TitleEdit
  }, {
    path: "/honorific",
    name: "Honorific",
    component: HonorificOverview
  }, {
    path: "/honorific/create",
    name: "CreateHonorific",
    component: HonorificEdit
  }, {
    path: "/honorific/:id?",
    name: "UpdateHonorific",
    component: HonorificEdit
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: Inventory
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from "vue"
import VueRouter from 'vue-router'
import CreateTypePage from "@/components/page/CreateTypePage.vue"
import Inventory from "@/components/page/Inventory"
import LandingPage from "@/components/page/LandingPage.vue"
import Overview from "@/components/page/Overview.vue"

import MaterialForm from "@/components/page/property/MaterialForm"
import PersonForm from "@/components/page/property/PersonForm"
import TitleForm from "@/components/page/property/TitleForm"
import HonorificForm from "@/components/page/property/HonorificForm"
import MintForm from "@/components/page/property/MintForm"
import NominalForm from "@/components/page/property/NominalForm"




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
    path: "/:property",
    name: "Property",
    component: Overview
  }, {
    path: "/material/create",
    name: "CreateMaterial",
    component: MaterialForm
  }, {
    path: "/material/:id",
    name: "EditMaterial",
    component: MaterialForm
  }, {
    path: "/person/create",
    name: "CreatePerson",
    component: PersonForm
  }, {
    path: "/person/:id",
    name: "EditPerson",
    component: PersonForm
  }, {
    path: "/title/create",
    name: "CreateTitle",
    component: TitleForm
  }, {
    path: "/title/:id",
    name: "EditTitle",
    component: TitleForm
  }, {
    path: "/honorific/create",
    name: "CreateHonorific",
    component: HonorificForm
  }, {
    path: "/honorific/:id",
    name: "EditHonorific",
    component: HonorificForm
  }, {
    path: "/mint/create",
    name: "CreateMint",
    component: MintForm
  }, {
    path: "/mint/:id",
    name: "EditMint",
    component: MintForm
  }, {
    path: "/nominal/create",
    name: "CreateNominal",
    component: NominalForm
  }, {
    path: "/nominal/:id",
    name: "EditNominal",
    component: NominalForm
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

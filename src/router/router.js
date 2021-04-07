import Vue from "vue"
import VueRouter from 'vue-router'

import CreateTypePage from "@/components/page/CreateTypePage.vue"
import CoinMarkOverview from "@/components/page/CoinMarkOverview.vue"
import Inventory from "@/components/page/Inventory"
import LandingPage from "@/components/page/LandingPage.vue"
import Overview from "@/components/page/Overview.vue"
import SideTree from "@/components/page/SideTree.vue"

import TypeOverview from "@/components/page/TypeOverview.vue"
import TreeExplorer from "@/components/page/TreeExplorer.vue"
import TypePage from "@/components/page/TypePage.vue"

import CoinMarkForm from "@/components/page/property/CoinMarkForm"
import HonorificForm from "@/components/page/property/HonorificForm"
import DynastyForm from "@/components/page/property/DynastyForm"
import MaterialForm from "@/components/page/property/MaterialForm"
import MintForm from "@/components/page/property/MintForm"
import NominalForm from "@/components/page/property/NominalForm"
import PersonForm from "@/components/page/property/PersonForm"
import RoleForm from "@/components/page/property/RoleForm"
import TitleForm from "@/components/page/property/TitleForm"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage
  },
  {
    path: '/explorer',
    name: 'Explorer',
    component: TreeExplorer
  }, {
    path: '/explorer2',
    name: 'Explorer2',
    component: SideTree
  },
  {

    path: "/manage/type",
    name: "TypeOverview",
    component: TypeOverview
  },
  {
    path: '/manage/type/create',
    name: 'TypeCreationPage',
    component: CreateTypePage
  }, {
    path: '/manage/type/edit/:id',
    name: 'EditTypePage',
    component: CreateTypePage
  }
  , {
    path: "/manage/coinmark",
    name: "CoinMarkOverview",
    component: CoinMarkOverview
  }, {
    path: "/:property",
    name: "Property",
    component: Overview
  },
  {
    path: '/type/:id',
    name: 'TypePage',
    component: TypePage
  },
  {
    path: "/coinmark/create",
    name: "CreateCoinMark",
    component: CoinMarkForm
  }, {
    path: "/coinmark/:id",
    name: "EditCoinMark",
    component: CoinMarkForm
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
  }, {
    path: "/role/create",
    name: "CreateRole",
    component: RoleForm
  }, {
    path: "/role/:id",
    name: "EditRole",
    component: RoleForm
  }, {
    path: "/dynasty/create",
    name: "CreateDynasty",
    component: DynastyForm
  }, {
    path: "/dynasty/:id",
    name: "EditDynasty",
    component: DynastyForm
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

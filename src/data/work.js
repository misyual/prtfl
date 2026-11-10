import portraitAmber from '../assets/Portrait-Amber-1-scaled.webp'
import silence from '../assets/SILENCE.webp'
import voidArt from '../assets/Void.webp'
import prim from '../assets/Prim-1.webp'
import chenqi from '../assets/Chenqi-1.webp'
import amber from '../assets/Amber.webp'
import amberNotes from '../assets/Amber Notes Yarn Cute Animals.webp'
import kit from '../assets/Kit.webp'
import pencilCase from '../assets/Pencil Case Eva (6).webp'
import fiksu from '../assets/Fiksu - FS-062.webp'
import pattern from '../assets/Pattern-2-scaled.webp'
import yarnNature from '../assets/Yarn-Nature-2-scaled.webp'

import kulai from '../assets/Kulai-atbp.webp'
import study56163 from '../assets/56163.webp'
import cert2 from '../assets/Cert2-scaled.webp'
import inspirational from '../assets/Inspirational-2-BACK_-scaled.webp'
import medals from '../assets/Medals.webp'
import pastel from '../assets/Pastel-Series-0.2-scaled.webp'
import yarnInspo from '../assets/Yarn-Inspirational-3-scaled.webp'

import pencilBanner from '../assets/Pencil Case Eva Banner-Recovered.webp'
import shopeeBanner from '../assets/Shopee Banner.webp'
import lazadaCover from '../assets/Lazada Cover.webp'
import blossom from '../assets/Blossom-Cover3-scaled.webp'
import journaling from '../assets/Journaling-Cover-Recovered-scaled (1).webp'
import medalBanner from '../assets/Medal-and-Certificate-Banner-scaled.webp'
import certificate from '../assets/photo_2025-12-18_16-34-14.webp'

import apiOverview from '../assets/API/design1.webp'
import apiDashboard from '../assets/API/Dashboard.webp'
import apiProduct from '../assets/API/Product.webp'
import apiOrder from '../assets/API/Order.webp'
import apiReports from '../assets/API/Reports.webp'
import apiComponents from '../assets/API/Components.webp'
import apiModal from '../assets/API/Modal.webp'
import apiUser from '../assets/API/User.webp'
import apiBranch from '../assets/API/Branch.webp'
import starOverview from '../assets/starbright/design2.webp'
import starCover from '../assets/starbright/Cover.webp'
import starAbout from '../assets/starbright/About.webp'
import starProduct from '../assets/starbright/product.webp'
import starFaq from '../assets/starbright/FAQ.webp'
import starLocation from '../assets/starbright/location.webp'
import starFullPage from '../assets/starbright/Screenshot 2026-09-27 220337.webp'

export const posters = [
  { id: 'w01', title: 'Amber — Portrait Study', category: 'Art Direction', src: portraitAmber },
  { id: 'w02', title: 'Silence', category: 'Poster', src: silence },
  { id: 'w03', title: 'Void', category: 'Poster', src: voidArt },
  { id: 'w04', title: 'Prim', category: 'Packaging', src: prim },
  { id: 'w05', title: 'Chenqi', category: 'Packaging', src: chenqi },
  { id: 'w06', title: 'Amber', category: 'Packaging', src: amber },
  { id: 'w07', title: 'Amber Notes — Yarn Series', category: 'Product', src: amberNotes },
  { id: 'w08', title: 'Kit', category: 'Branding', src: kit },
  { id: 'w09', title: 'Pencil Case Eva', category: 'Product', src: pencilCase },
  { id: 'w10', title: 'Fiksu FS-062', category: 'Campaign', src: fiksu },
  { id: 'w11', title: 'Pattern Study 02', category: 'Pattern', src: pattern },
  { id: 'w12', title: 'Yarn & Nature', category: 'Editorial', src: yarnNature },
]

export const archive = [
  { id: 'a01', title: 'Kulai', category: 'Packaging', src: kulai },
  { id: 'a02', title: 'Study 56163', category: 'Poster', src: study56163 },
  { id: 'a03', title: 'Certificate', category: 'Print', src: cert2 },
  { id: 'a04', title: 'Inspirational II', category: 'Poster', src: inspirational },
  { id: 'a05', title: 'Medals', category: 'Print', src: medals },
  { id: 'a06', title: 'Pastel Series', category: 'Pattern', src: pastel },
  { id: 'a07', title: 'Yarn Inspirational III', category: 'Editorial', src: yarnInspo },
]

export const banners = [
  {
    id: 'b01',
    title: 'Pencil Case Eva',
    platform: 'Campaign Banner',
    src: pencilBanner,
    alt: 'Pencil Case Eva campaign banner',
    width: 1800,
    height: 684,
  },
  {
    id: 'b02',
    title: 'Lazada Storefront',
    platform: 'Storefront Cover',
    src: lazadaCover,
    alt: 'Lazada storefront cover',
    width: 1800,
    height: 684,
  },
  {
    id: 'b03',
    title: 'Shopee Storefront',
    platform: 'Mobile Hero',
    src: shopeeBanner,
    alt: 'Shopee storefront banner',
    width: 1800,
    height: 900,
  },
  {
    id: 'b04',
    title: 'Blossom',
    platform: 'Product Cover',
    src: blossom,
    alt: 'Blossom product cover',
    width: 1600,
    height: 1016,
  },
  {
    id: 'b05',
    title: 'Journaling',
    platform: 'Product Cover',
    src: journaling,
    alt: 'Journaling product cover',
    width: 1600,
    height: 1016,
  },
  {
    id: 'b06',
    title: 'Medal & Certificate',
    platform: 'Website Banner',
    src: medalBanner,
    alt: 'Medal and certificate banner',
    width: 1600,
    height: 1013,
  },
  {
    id: 'b07',
    title: 'Certificate Feature',
    platform: 'Website Banner',
    src: certificate,
    alt: 'Certificate banner',
    width: 1280,
    height: 810,
  },
]

export const caseStudies = [
  {
    id: 1,
    title: 'E-commerce API UI',
    category: 'Dashboard',
    cover: apiOverview,
    year: '2025',
    role: 'UI Design · Front-End',
    client: 'E-commerce Team',
    tools: ['Figma', 'Laravel/Inertia', 'React', 'Tailwind'],
    summary:
      'Built the internal multi-channel order management dashboard from scratch, designing a unified component system across order, branch, and user management screens.',
    challenge:
      'The team needed a single tool to manage orders synced from Shopee, TikTok, and Lazada, along with branches and user accounts — with no existing dashboard to build on, every screen, component, and interaction pattern had to be designed and built from zero.',
    approach:
      'Designed the UI in Figma around a consistent visual language — amber/orange gradient table headers, icon-only action buttons, and pill-style search bars — then built it in a Laravel/Inertia + React + Tailwind stack across the Branches, User Management, and Orders/Waybills pages.',
    outcome:
      'Delivered a working dashboard with a defined button hierarchy and hover/active state system, plus a Reports section concept (per-channel revenue breakdowns and period-over-period comparisons) built on the same design foundation.',
    gallery: [
      { src: apiOverview, label: 'Overview' },
      { src: apiDashboard, label: 'Dashboard' },
      { src: apiProduct, label: 'Product' },
      { src: apiOrder, label: 'Order' },
      { src: apiReports, label: 'Reports' },
      { src: apiComponents, label: 'Components' },
      { src: apiModal, label: 'Modal' },
      { src: apiUser, label: 'User' },
      { src: apiBranch, label: 'Branch' },
    ],
  },
  {
    id: 2,
    title: 'starbright.com.ph UI Redesign',
    category: 'Whole Site',
    cover: starOverview,
    year: '2025',
    role: 'Art Direction · UI Design',
    client: 'Starbright',
    tools: ['Figma', 'WordPress', 'WooCommerce'],
    summary:
      'Redesigned every page of the Starbright Office Depot WordPress/WooCommerce site, refreshing the visual direction and rebuilding UI elements site-wide.',
    challenge:
      'The existing site had an outdated look and inconsistent UI across pages, with issues like unreliable asset hosting affecting things as basic as footer icons rendering properly.',
    approach:
      "Redesigned the site page by page in Figma and Illustrator, then implemented the new direction directly in WordPress/WooCommerce — including rebuilding the footer's social and payment icon row and fixing asset delivery by moving icons into the WordPress Media Library with full file URLs.",
    outcome:
      'A consistently redesigned site across all pages, with resolved asset-hosting issues ensuring UI elements like footer icons render reliably.',
    gallery: [
      { src: starOverview, label: 'Overview' },
      { src: starCover, label: 'Cover' },
      { src: starAbout, label: 'About' },
      { src: starProduct, label: 'Products' },
      { src: starFaq, label: 'FAQ' },
      { src: starLocation, label: 'Location' },
      { src: starFullPage, label: 'Full page' },
    ],
  },
]

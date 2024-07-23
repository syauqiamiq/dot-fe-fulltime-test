# Technical Test for Frontend Developer NextJS - DOT Indonesia

## Author

Muhammad Syauqi Amiq Amrullah

## Project Overview

Website ini dibuat menggunakan framework Next.js dengan state management menggunakan Redux Toolkit dan RTK Query untuk komunikasi API. Website ini menggunakan Tailwind CSS yang di padukan dengan Ant Design. Fitur utama website ini adalah cek ongkir dari jasa ekspedisi POS Indonesia, JNE dan TIKI dengan memanfaatkan third-party API milik RajaOngkir.

## Tech Stack

CSS Framework: Tailwind CSS

UI Framework: Ant Design

Programming Language: TypeScript

Framework: Next.js (14.2.4)

## Requirement

Node.js Version: 20.10.0

Yarn Version: 1.22.21

React Version: ^18

## Live Preview

[See Live Preview on Vercel](https://dot-fe-fulltime-test.vercel.app/)

## Dummy Account

Guest:

```shell
email: guest@email.com
password: guest
```

## Dummy Account

Guest:

```shell
email: guest@email.com
password: guest
```

## Installation Guide

clone:

```shell
git clone https://github.com/syauqiamiq/dot-fe-fulltime-test
```

masuk ke directory project:

```shell
cd dot-fe-fulltime-test
```

install package dengan "yarn":

```shell
yarn
```

copy `.env.example` menjadi `.env.development`, dan isikan env variable berikut:

```shell
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
RAJA_ONGKIR_API_KEY=0dbeffe294d1cb46d3ea6ea268b36047
RAJA_ONGKIR_SERVERSIDE_API_URL=https://api.rajaongkir.com/starter
```

jalankan development server:

```shell
yarn dev
```

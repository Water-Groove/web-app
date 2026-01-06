--
-- PostgreSQL database dump
--

\restrict bDfcpH1ndfUMuU4w85SVEoO1GC7rXfqAArz4m0xm0yz4ttBuqkdFSiEWPG6zbW7

-- Dumped from database version 17.7 (bdc8956)
-- Dumped by pg_dump version 17.6 (Ubuntu 17.6-2.pgdg24.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', 'public', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: AdminRole; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."AdminRole" AS ENUM (
    'ADMIN',
    'SUPERADMIN'
);


ALTER TYPE public."AdminRole" OWNER TO neondb_owner;

--
-- Name: InvestmentStatus; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."InvestmentStatus" AS ENUM (
    'PENDING_PAYMENT',
    'ACTIVE',
    'PAUSED',
    'COMPLETED',
    'CANCELLED',
    'REJECTED'
);


ALTER TYPE public."InvestmentStatus" OWNER TO neondb_owner;

--
-- Name: InvestorTier; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."InvestorTier" AS ENUM (
    'STARTER',
    'GROWTH',
    'PREMIUM',
    'ELITE',
    'EXECUTIVE'
);


ALTER TYPE public."InvestorTier" OWNER TO neondb_owner;

--
-- Name: TransactionStatus; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."TransactionStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED',
    'PAID'
);


ALTER TYPE public."TransactionStatus" OWNER TO neondb_owner;

--
-- Name: TransactionType; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."TransactionType" AS ENUM (
    'DEPOSIT',
    'WITHDRAWAL',
    'INTEREST'
);


ALTER TYPE public."TransactionType" OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Admin; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Admin" (
    id text NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    role "AdminRole" DEFAULT 'ADMIN'::"AdminRole" NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "lastLoginAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "auth_Id" text NOT NULL
);


ALTER TABLE public."Admin" OWNER TO neondb_owner;

--
-- Name: CronLock; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."CronLock" (
    name text NOT NULL,
    "lockedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CronLock" OWNER TO neondb_owner;

--
-- Name: Investment; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Investment" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "categoryId" text NOT NULL,
    "principalAmount" numeric(15,2) NOT NULL,
    "roiRateSnapshot" numeric(5,2) NOT NULL,
    "durationMonths" integer NOT NULL,
    status "InvestmentStatus" DEFAULT 'PENDING_PAYMENT'::"InvestmentStatus" NOT NULL,
    "startDate" timestamp(3) without time zone,
    "endDate" timestamp(3) without time zone,
    "approvedByAdminId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "lastRoiPeriodPaid" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Investment" OWNER TO neondb_owner;

--
-- Name: InvestmentCategory; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."InvestmentCategory" (
    id text NOT NULL,
    "minAmount" numeric(15,2) NOT NULL,
    "maxAmount" numeric(15,2),
    "monthlyRoiRate" numeric(5,2) DEFAULT 0.02 NOT NULL,
    "durationMonths" integer NOT NULL,
    description text,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    code text NOT NULL,
    priority integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."InvestmentCategory" OWNER TO neondb_owner;

--
-- Name: InvestorBalance; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."InvestorBalance" (
    id text NOT NULL,
    "investmentId" text NOT NULL,
    "principalLocked" numeric(15,2) NOT NULL,
    "roiAccrued" numeric(15,2) DEFAULT 0 NOT NULL,
    "totalDeposited" numeric(15,2) DEFAULT 0 NOT NULL,
    "totalWithdrawn" numeric(15,2) DEFAULT 0 NOT NULL,
    "availableBalance" numeric(15,2) DEFAULT 0 NOT NULL,
    "lastComputedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."InvestorBalance" OWNER TO neondb_owner;

--
-- Name: PlatformBankAccount; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."PlatformBankAccount" (
    id text NOT NULL,
    "bankName" text NOT NULL,
    "accountNumber" text NOT NULL,
    "accountHolderName" text NOT NULL,
    currency text DEFAULT 'NGN'::text NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "isDefault" boolean DEFAULT false NOT NULL,
    "createdByAdminId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."PlatformBankAccount" OWNER TO neondb_owner;

--
-- Name: Transaction; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Transaction" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "investmentId" text,
    type "TransactionType" NOT NULL,
    status "TransactionStatus" DEFAULT 'PENDING'::"TransactionStatus" NOT NULL,
    amount numeric(15,2) NOT NULL,
    "proofUrl" text,
    description text,
    "processedByAdminId" text,
    "processedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "earlyWithdrawal" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Transaction" OWNER TO neondb_owner;

--
-- Name: User; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    phone text,
    picture text,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "investmentCategoryId" text,
    "auth_Id" text NOT NULL
);


ALTER TABLE public."User" OWNER TO neondb_owner;

--
-- Name: WithdrawalDetail; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."WithdrawalDetail" (
    id text NOT NULL,
    "transactionId" text NOT NULL,
    "bankName" text NOT NULL,
    "accountNumber" text NOT NULL,
    "accountHolderName" text NOT NULL,
    reference text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."WithdrawalDetail" OWNER TO neondb_owner;

--
-- Name: WithdrawalPenalty; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."WithdrawalPenalty" (
    id text NOT NULL,
    "transactionId" text NOT NULL,
    percentage numeric(5,2) NOT NULL,
    amount numeric(15,2) NOT NULL,
    reason text NOT NULL,
    "appliedByAdminId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."WithdrawalPenalty" OWNER TO neondb_owner;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO neondb_owner;

--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Admin" (id, "fullName", email, "passwordHash", role, "isActive", "lastLoginAt", "createdAt", "updatedAt", "auth_Id") FROM stdin;
b65c2fcc-290c-470f-996b-6b7dd3a864ba	Tunmise Falodun (ULTIMATE-25)	ultimatefaloe@gmail.com		ADMIN	t	\N	2026-01-04 15:07:02.387	2026-01-04 15:07:02.544	google-oauth2|105089415730061575629
\.


--
-- Data for Name: CronLock; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."CronLock" (name, "lockedAt") FROM stdin;
\.


--
-- Data for Name: Investment; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Investment" (id, "userId", "categoryId", "principalAmount", "roiRateSnapshot", "durationMonths", status, "startDate", "endDate", "approvedByAdminId", "createdAt", "updatedAt", "lastRoiPeriodPaid") FROM stdin;
62b728c7-1263-40f7-b4e3-5855c243477f	feaa2add-6919-4492-b484-eb2447d1d5de	63a47529-b273-4256-adf2-2bbfaa07fd0f	9000000.00	0.02	18	ACTIVE	2026-01-06 09:21:50.127	2027-07-06 09:21:50.127	b65c2fcc-290c-470f-996b-6b7dd3a864ba	2026-01-06 09:19:02.841	2026-01-06 09:21:50.127	0
45f35536-05d9-4c7b-83fc-38d1699f6f1c	feaa2add-6919-4492-b484-eb2447d1d5de	a516353b-6f2c-4243-916f-54ffde9f0b35	4000000.00	0.02	18	ACTIVE	2026-01-06 09:22:48.661	2027-07-06 09:22:48.661	b65c2fcc-290c-470f-996b-6b7dd3a864ba	2026-01-06 09:06:03.634	2026-01-06 09:22:48.661	0
\.


--
-- Data for Name: InvestmentCategory; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."InvestmentCategory" (id, "minAmount", "maxAmount", "monthlyRoiRate", "durationMonths", description, "isActive", "createdAt", "updatedAt", code, priority, name) FROM stdin;
61b9afac-e3b2-4c19-a0e8-13b28b6ce58d	100000.00	499000.00	0.02	18	₦100k – ₦499k	t	2026-01-04 13:29:39.65	2026-01-04 13:29:39.65	STARTER	1	STARTER
5ef44960-56a2-4d17-83f4-c203e7640255	500000.00	1000000.00	0.02	18	₦500k – ₦1M	t	2026-01-04 13:29:39.65	2026-01-04 13:29:39.65	GROWTH	2	GROWTH
a516353b-6f2c-4243-916f-54ffde9f0b35	1000000.00	5000000.00	0.02	18	₦1M – ₦5M	t	2026-01-04 13:29:39.65	2026-01-04 13:29:39.65	PREMIUM	3	PREMIUM
63a47529-b273-4256-adf2-2bbfaa07fd0f	5000000.00	10000000.00	0.02	18	₦5M – ₦10M	t	2026-01-04 13:29:39.65	2026-01-04 13:29:39.65	ELITE	4	ELITE
545d874e-8c41-43fb-8b00-10b109ccc29e	10000000.00	50000000.00	0.02	18	₦10M+	t	2026-01-04 13:29:39.65	2026-01-04 13:29:39.65	EXECUTIVE	5	EXECUTIVE
\.


--
-- Data for Name: InvestorBalance; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."InvestorBalance" (id, "investmentId", "principalLocked", "roiAccrued", "totalDeposited", "totalWithdrawn", "availableBalance", "lastComputedAt", "createdAt", "updatedAt") FROM stdin;
1eaf603d-f1a0-471f-8358-0d282ba16d9f	62b728c7-1263-40f7-b4e3-5855c243477f	9000000.00	0.00	9000000.00	0.00	0.00	2026-01-06 09:21:51.358	2026-01-06 09:19:04.217	2026-01-06 09:21:51.358
63b0a6e4-79fd-4a12-af4f-67e592b964b2	45f35536-05d9-4c7b-83fc-38d1699f6f1c	4000000.00	0.00	4000000.00	0.00	0.00	2026-01-06 09:22:49.622	2026-01-06 09:06:04.535	2026-01-06 09:22:49.622
\.


--
-- Data for Name: PlatformBankAccount; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."PlatformBankAccount" (id, "bankName", "accountNumber", "accountHolderName", currency, "isActive", "isDefault", "createdByAdminId", "createdAt", "updatedAt") FROM stdin;
92c942fc-a539-4537-a27c-fa716a19eb35	Moniepoint	4946257185	Glimmerz by triple j-watergrove investment platform	NGN	t	t	\N	2026-01-04 13:29:42.156	2026-01-04 13:29:42.156
\.


--
-- Data for Name: Transaction; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Transaction" (id, "userId", "investmentId", type, status, amount, "proofUrl", description, "processedByAdminId", "processedAt", "createdAt", "updatedAt", "earlyWithdrawal") FROM stdin;
2459960f-ecbf-4a67-9ea9-50eb11c69725	feaa2add-6919-4492-b484-eb2447d1d5de	62b728c7-1263-40f7-b4e3-5855c243477f	DEPOSIT	APPROVED	9000000.00	\N	For Investment Purpose	b65c2fcc-290c-470f-996b-6b7dd3a864ba	2026-01-06 09:21:50.435	2026-01-06 09:19:03.318	2026-01-06 09:21:50.435	f
30f0294d-2644-464c-95be-a968af3862c0	feaa2add-6919-4492-b484-eb2447d1d5de	45f35536-05d9-4c7b-83fc-38d1699f6f1c	DEPOSIT	APPROVED	4000000.00	https://res.cloudinary.com/dhc6ffywi/image/upload/v1767690517/water-groove/proofs/rsvlzaiavcybrfazzy6x.png	For Investment Purpose	b65c2fcc-290c-470f-996b-6b7dd3a864ba	2026-01-06 09:22:48.875	2026-01-06 09:06:04.131	2026-01-06 09:22:48.875	f
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."User" (id, "fullName", email, phone, picture, "isActive", "createdAt", "updatedAt", "investmentCategoryId", "auth_Id") FROM stdin;
d2e90556-900c-4001-940e-a9552a81f05d	Tunmise Falodun (ULTIMATE-25)	ultimatefaloe@gmail.com	\N	https://lh3.googleusercontent.com/a/ACg8ocKlVn1ZRE-E_Kd_7baYibSptS_9ZnNpjI1Tdc60pw6Bwokn1mXy=s96-c	t	2026-01-04 15:06:00.2	2026-01-04 15:06:00.344	\N	google-oauth2|105089415730061575629
74cd3f27-dd7d-4c82-8f64-0c94d061cefb	59 minutes Print	59minutesprint@gmail.com	\N	https://lh3.googleusercontent.com/a/ACg8ocJyzsT_SujjeC-GRq7OqbbTGXp6I_i1MGds0T9FoSvn4eHV3z8=s96-c	t	2026-01-04 15:57:06.466	2026-01-04 15:57:06.6	\N	google-oauth2|111576608603429868606
feaa2add-6919-4492-b484-eb2447d1d5de	Eniola Badmus	eniolabadmus351@gmail.com	\N	https://lh3.googleusercontent.com/a/ACg8ocKmGF8WgBx4zrt_fFsT_L0NFqSA5HzEgTz9yLXS9ezvkcVv0A=s96-c	t	2026-01-06 09:00:53.55	2026-01-06 09:19:03.094	63a47529-b273-4256-adf2-2bbfaa07fd0f	google-oauth2|107087444103172035682
a9ff34df-f897-4f57-b7b8-106b6d08da28	Daniel López	usmc.dlopez1@gmail.com	\N	https://lh3.googleusercontent.com/a/ACg8ocLbIzpl9Wh8sIDjaiuO0jE6kn3xc4A_cgtvIZVAxOXzkxW9Tk0=s96-c	t	2026-01-06 11:48:19.818	2026-01-06 11:48:19.862	\N	google-oauth2|105629252675768926242
\.


--
-- Data for Name: WithdrawalDetail; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."WithdrawalDetail" (id, "transactionId", "bankName", "accountNumber", "accountHolderName", reference, "createdAt") FROM stdin;
\.


--
-- Data for Name: WithdrawalPenalty; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."WithdrawalPenalty" (id, "transactionId", percentage, amount, reason, "appliedByAdminId", "createdAt") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
db787c22-da23-47ce-8fdf-a2feef5e2faa	cc7407fc8b58e65c77fc9cc0a936ee991f6b086e650ae46b0ad04d319b6c9894	2026-01-04 13:27:04.913236+00	20251221121620_init	\N	\N	2026-01-04 13:27:03.42701+00	1
53450c84-24f3-4113-b82f-aef68aaf45e6	0ce66b6bdff5c8988dd96d34cf75d054533d0f8aacdbda400820413c12e77340	2026-01-04 13:27:09.468066+00	20251221141549_platform_entity_added	\N	\N	2026-01-04 13:27:05.787322+00	1
8352182c-5243-4909-8876-e9d626d2c67d	0e2d578eaf89ce7d197cca65a80c38ed7a92c3051073a1a33dc97e232bf8f55e	2026-01-04 13:27:12.538536+00	20251222233448_data_schema_and_relationship_update	\N	\N	2026-01-04 13:27:10.69977+00	1
ab86c26b-fde3-4341-adb2-b35dfa70effe	1f19a7e2cb44f84b9f8b2ef9e78d3fc70c9ba5b1bf8756d4b97894a3dd4e2774	2026-01-04 13:27:15.280686+00	20251222234609_auth0_id_to_auth_id	\N	\N	2026-01-04 13:27:13.052396+00	1
2c02b8c3-6e68-40f1-a8b9-75f19c465870	da01a82d32d03bd460b47153781fcd77425936e8ebecdfa626af8a32a0f83a55	2026-01-04 13:27:19.94388+00	20251224134457_admin_schema_update	\N	\N	2026-01-04 13:27:15.919177+00	1
603fb742-69dc-484e-91be-6eb68c4b3c98	12eb31b7bc8447aae82858cd80f2ddcfc29430cf103dcbfba36eff97ce78ff9f	2026-01-04 13:27:23.432731+00	20251225122717_roi_updated	\N	\N	2026-01-04 13:27:21.448729+00	1
06b3e52c-72e3-4e2b-b780-5d8d48013ac6	f89571c27bc2a5a0b3b2c361042dae668fce5fe70f14c62f1d4a5147bc03b340	2026-01-04 13:27:25.750251+00	20251225122833_roi_updated_on_investment_category	\N	\N	2026-01-04 13:27:24.213359+00	1
6fa498a7-30d4-489d-af7a-a2f7f2f37ea2	95b2fd8f3d133b305bc8b0fc0c00725a83ef8f9314b35010146a2726ca1a794d	2026-01-04 13:27:28.850615+00	20251226120651_roisnapshot_fixed	\N	\N	2026-01-04 13:27:26.228784+00	1
99d0f783-0182-4e78-92cb-3be72e3b49ae	1346f36abab1d7f9f035f701aaa588adf5936ffaef6719623593e22cdc048d37	2026-01-04 13:27:30.834105+00	20251227125524_withdrawal_penalty_added	\N	\N	2026-01-04 13:27:29.5424+00	1
c0e3cec0-278d-403b-9a69-76d78abe2530	97ab6137851983c778eb2e92b30588d3d38723f7ff3203a5b485846dd2553d52	2026-01-04 13:27:34.248265+00	20251228094450_admin_auth0_id_included	\N	\N	2026-01-04 13:27:31.790919+00	1
4938e139-e62d-4b71-8cef-752df62fe9b3	5dccb4a8f5c67bf5e6828fcdd2267304b891139b0f26b660800463babe24ca7c	2026-01-04 13:27:37.591335+00	20251228160529_last_roi_included_for_roi_cron	\N	\N	2026-01-04 13:27:35.373372+00	1
\.


--
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);


--
-- Name: CronLock CronLock_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."CronLock"
    ADD CONSTRAINT "CronLock_pkey" PRIMARY KEY (name);


--
-- Name: InvestmentCategory InvestmentCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."InvestmentCategory"
    ADD CONSTRAINT "InvestmentCategory_pkey" PRIMARY KEY (id);


--
-- Name: Investment Investment_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Investment"
    ADD CONSTRAINT "Investment_pkey" PRIMARY KEY (id);


--
-- Name: InvestorBalance InvestorBalance_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."InvestorBalance"
    ADD CONSTRAINT "InvestorBalance_pkey" PRIMARY KEY (id);


--
-- Name: PlatformBankAccount PlatformBankAccount_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."PlatformBankAccount"
    ADD CONSTRAINT "PlatformBankAccount_pkey" PRIMARY KEY (id);


--
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: WithdrawalDetail WithdrawalDetail_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."WithdrawalDetail"
    ADD CONSTRAINT "WithdrawalDetail_pkey" PRIMARY KEY (id);


--
-- Name: WithdrawalPenalty WithdrawalPenalty_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."WithdrawalPenalty"
    ADD CONSTRAINT "WithdrawalPenalty_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Admin_auth_Id_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "Admin_auth_Id_key" ON public."Admin" USING btree ("auth_Id");


--
-- Name: Admin_email_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "Admin_email_idx" ON public."Admin" USING btree (email);


--
-- Name: Admin_email_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "Admin_email_key" ON public."Admin" USING btree (email);


--
-- Name: Admin_role_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "Admin_role_idx" ON public."Admin" USING btree (role);


--
-- Name: InvestmentCategory_code_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "InvestmentCategory_code_key" ON public."InvestmentCategory" USING btree (code);


--
-- Name: InvestmentCategory_isActive_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "InvestmentCategory_isActive_idx" ON public."InvestmentCategory" USING btree ("isActive");


--
-- Name: InvestmentCategory_priority_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "InvestmentCategory_priority_idx" ON public."InvestmentCategory" USING btree (priority);


--
-- Name: Investment_categoryId_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "Investment_categoryId_idx" ON public."Investment" USING btree ("categoryId");


--
-- Name: Investment_status_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "Investment_status_idx" ON public."Investment" USING btree (status);


--
-- Name: Investment_userId_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "Investment_userId_idx" ON public."Investment" USING btree ("userId");


--
-- Name: InvestorBalance_investmentId_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "InvestorBalance_investmentId_key" ON public."InvestorBalance" USING btree ("investmentId");


--
-- Name: PlatformBankAccount_isActive_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "PlatformBankAccount_isActive_idx" ON public."PlatformBankAccount" USING btree ("isActive");


--
-- Name: PlatformBankAccount_isDefault_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "PlatformBankAccount_isDefault_idx" ON public."PlatformBankAccount" USING btree ("isDefault");


--
-- Name: Transaction_investmentId_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "Transaction_investmentId_idx" ON public."Transaction" USING btree ("investmentId");


--
-- Name: Transaction_status_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "Transaction_status_idx" ON public."Transaction" USING btree (status);


--
-- Name: Transaction_type_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "Transaction_type_idx" ON public."Transaction" USING btree (type);


--
-- Name: Transaction_userId_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "Transaction_userId_idx" ON public."Transaction" USING btree ("userId");


--
-- Name: User_auth_Id_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "User_auth_Id_key" ON public."User" USING btree ("auth_Id");


--
-- Name: User_email_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "User_email_idx" ON public."User" USING btree (email);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_phone_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "User_phone_key" ON public."User" USING btree (phone);


--
-- Name: WithdrawalDetail_transactionId_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "WithdrawalDetail_transactionId_key" ON public."WithdrawalDetail" USING btree ("transactionId");


--
-- Name: WithdrawalPenalty_transactionId_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "WithdrawalPenalty_transactionId_idx" ON public."WithdrawalPenalty" USING btree ("transactionId");


--
-- Name: WithdrawalPenalty_transactionId_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "WithdrawalPenalty_transactionId_key" ON public."WithdrawalPenalty" USING btree ("transactionId");


--
-- Name: Investment Investment_approvedByAdminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Investment"
    ADD CONSTRAINT "Investment_approvedByAdminId_fkey" FOREIGN KEY ("approvedByAdminId") REFERENCES "Admin"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Investment Investment_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Investment"
    ADD CONSTRAINT "Investment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "InvestmentCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Investment Investment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Investment"
    ADD CONSTRAINT "Investment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: InvestorBalance InvestorBalance_investmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."InvestorBalance"
    ADD CONSTRAINT "InvestorBalance_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PlatformBankAccount PlatformBankAccount_createdByAdminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."PlatformBankAccount"
    ADD CONSTRAINT "PlatformBankAccount_createdByAdminId_fkey" FOREIGN KEY ("createdByAdminId") REFERENCES "Admin"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Transaction Transaction_investmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Transaction Transaction_processedByAdminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_processedByAdminId_fkey" FOREIGN KEY ("processedByAdminId") REFERENCES "Admin"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Transaction Transaction_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_investmentCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_investmentCategoryId_fkey" FOREIGN KEY ("investmentCategoryId") REFERENCES "InvestmentCategory"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: WithdrawalDetail WithdrawalDetail_transactionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."WithdrawalDetail"
    ADD CONSTRAINT "WithdrawalDetail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: WithdrawalPenalty WithdrawalPenalty_appliedByAdminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."WithdrawalPenalty"
    ADD CONSTRAINT "WithdrawalPenalty_appliedByAdminId_fkey" FOREIGN KEY ("appliedByAdminId") REFERENCES "Admin"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: WithdrawalPenalty WithdrawalPenalty_transactionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."WithdrawalPenalty"
    ADD CONSTRAINT "WithdrawalPenalty_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

\unrestrict bDfcpH1ndfUMuU4w85SVEoO1GC7rXfqAArz4m0xm0yz4ttBuqkdFSiEWPG6zbW7


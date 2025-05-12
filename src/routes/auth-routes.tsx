import React, { Suspense } from "react";
import { Route } from "@/utils/router-polyfill";
import { RouteErrorBoundary } from "@/components/error-boundary/RouteErrorBoundary";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";

import Index from "@/pages/Mainindex";
import Pricing from "@/pages/Pricing";
import ITConsulting from "@/pages/ITConsulting";
import { PageLoader } from "./page-loader";
import About from "../pages/About";
import Contact from "../pages/Contact";
import CareersPage from "../pages/career";
import Sales from "../career/Sales Associate";
import Ai from "../career/AI Research Scientist";
import AdeptAIPageRelease from "../pages/Press";
import Apply from "../career/Apply"
import Web from "../career/Full Stack Web Developer";
import Full  from "../career/Full Stack Engineer";
import Machinelearning from "../career/Machine learning engineer"


import Naukriaaply from "../career/Apply"
import Services from "@/pages/Serives";
import ForgotPassword from '@/pages/ForgotPassword';

export const authRoutes = (
  <>
    <Route path="/" element={<RouteErrorBoundary><Index /></RouteErrorBoundary>} />
    <Route path="/contact" element={<RouteErrorBoundary><Contact /></RouteErrorBoundary>} />
    <Route path="/about" element={<RouteErrorBoundary><About /></RouteErrorBoundary>} />
    <Route path="/career" element={<RouteErrorBoundary><CareersPage /></RouteErrorBoundary>} />
    <Route path="/press-release" element={<RouteErrorBoundary><AdeptAIPageRelease /></RouteErrorBoundary>} />

    {/* Career */}
    <Route path="/careers/sales-associate-it-consulting-ai-consulting-services/" element={<RouteErrorBoundary><Sales /></RouteErrorBoundary>} />
    <Route path="/careers/full-stack-engineer" element={<RouteErrorBoundary><Full /></RouteErrorBoundary>} />
    <Route path="/careers/full-stack-web-developer-java-technologies-ai-saas-platform/" element={<RouteErrorBoundary><Web /></RouteErrorBoundary>} />
    <Route path="/careers/machine-learning-engineer/" element={<RouteErrorBoundary><Machinelearning /></RouteErrorBoundary>} />
    <Route path="/careers/ai-research-scientist" element={<RouteErrorBoundary><Ai /></RouteErrorBoundary>} />
    <Route path="/apply" element={<RouteErrorBoundary><Naukriaaply /></RouteErrorBoundary>} />
    <Route path="/" element={<RouteErrorBoundary><Index /></RouteErrorBoundary>} />
    <Route path="/" element={<RouteErrorBoundary><Index /></RouteErrorBoundary>} />
    <Route path="/" element={<RouteErrorBoundary><Index /></RouteErrorBoundary>} />

    <Route path="/login" element={<RouteErrorBoundary><Login /></RouteErrorBoundary>} />
    <Route path="/signup" element={<RouteErrorBoundary><Signup /></RouteErrorBoundary>} />
    <Route path="/unauthorized" element={<RouteErrorBoundary><Unauthorized /></RouteErrorBoundary>} />
    <Route path="/pricing" element={
      <RouteErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Pricing />
        </Suspense>
      </RouteErrorBoundary>
    } />
    <Route path="/services/it-consulting" element={
      <RouteErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <ITConsulting />
        </Suspense>
      </RouteErrorBoundary>
    } /> 
    <Route path="/services/it-workforce-solutions" element={
      <RouteErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Services />
        </Suspense>
      </RouteErrorBoundary>
    } /> 
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="*" element={<RouteErrorBoundary><NotFound /></RouteErrorBoundary>} />
  </>
);

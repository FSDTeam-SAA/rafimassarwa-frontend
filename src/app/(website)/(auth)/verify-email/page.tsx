"use client"

import EmailVerification from '@/components/Authentication/verify-email'
import React, { Suspense } from 'react'

export default function page() {

    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <EmailVerification />
            </Suspense>
        </main>
    )
}

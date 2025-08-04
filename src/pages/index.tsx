import React from 'react';
import Head from 'next/head';
import ContactUs from '@/components/ContactUs';


export default function Home() {



    return (
        <>
            <Head>
                <title>Khatija&apos;s Contact Form</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen overflow-hidden">

                <ContactUs />

            </div>
        </>
    );
}

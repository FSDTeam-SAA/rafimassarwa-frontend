import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define types for our data structures
type CompanyInfo = {
    name: string
    ticker: string
    headquarters: string
    description: string[]
    products: string[]
    services: string[]
}


export default function BusinessOverviewDescription() {
    // Company information data
    const companyData: CompanyInfo = {
        name: "Apple",
        ticker: "APPL",
        headquarters: "San Francisco, California",
        description: [
            "Apple Inc. (AAPL) is a leading technology company headquartered in San Francisco, California. The company designs, develops, and markets innovative smart devices, software solutions, and digital services.",
            "TechNova's core products include the NexPhone smartphone series, TabPro tablets, Quantum laptops, NovaBand wearables, and HomeHub smart home systems. Additionally, TechNova provides a range of services such as the Nova App Marketplace, NovaStream music and video streaming, CloudVault storage, and NovaPay digital payment solutions, creating a comprehensive ecosystem for its users.",
        ],
        products: [
            "NexPhone smartphone series",
            "TabPro tablets",
            "Quantum laptops",
            "NovaBand wearables",
            "HomeHub smart home systems",
        ],
        services: [
            "Nova App Marketplace",
            "NovaStream music and video streaming",
            "CloudVault storage",
            "TechCare extended warranties",
            "NovaPay digital payment solutions",
        ],
    }

    // Revenue model paragraphs
    const revenueModelText = [
        `${companyData.name} generates revenue through a combination of product sales and services. The majority of its income comes from hardware sales, particularly the ${companyData.products[0]}, which consistently contributes the largest portion of its total revenue. Other significant hardware sources include the ${companyData.products[2]}, ${companyData.products[1]}, and wearables like the ${companyData.products[3]}.`,
        `Beyond hardware, ${companyData.name} has been increasingly focusing on its Services segment, which includes revenue from the ${companyData.services[0]}, ${companyData.services[1]} subscriptions, ${companyData.services[2]} services, ${companyData.services[3]}, and ${companyData.services[4]}. This diversification into services has provided a steady, recurring revenue stream that complements its hardware sales.`,
        `Additionally, ${companyData.name}'s ecosystem strategy encourages consumer loyalty and cross-product usage, further driving sales and service revenue. Strategic partnerships, such as with telecommunications companies for ${companyData.products[0]} distribution, also play a crucial role in expanding ${companyData.name}'s market reach and boosting sales.`,
    ]



    return (
        <div className="container mx-auto mt-20">
            <h1 className="text-lg font-bold mb-6 md:text-xl">{companyData.name} Business Overview & Revenue Model</h1>

            <div className="shadow-[0px_0px_10px_1px_#0000001A]">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base md:text-xl font-medium">Company Description</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm md:text-base space-y-4 text-justify md:text-start">
                        {companyData.description.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base md:text-xl font-medium">How the Company Makes Money</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm md:text-base space-y-4 text-justify md:text-start">
                        {revenueModelText.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

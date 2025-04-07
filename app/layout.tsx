import "./global.css"

export const metadata = {
    title: "MonadGPT",
    description: "MonadGPT is a powerful AI RAG (retrieval-augmented generation) tool that helps you find the information you need quickly and easily.",
}

export const RootLayout = ({children})=>{
    return(
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    )
}
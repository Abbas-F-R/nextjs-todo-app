import Header from "@/Components/Header";

function about() {
    let b = true;
    return (
        <main>
            {b && <Header/>}
        </main>
    );
}

export default about;

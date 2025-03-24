export default function test( { searchParams }: { searchParams: { [key: string]: string } } ) {
    console.log(searchParams)
    return (
        <div>Test Page</div>
    )
}
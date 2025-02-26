const ProductRow = ({ productRow }) => {

    return (
        <tr className="h-[25px] font-roboto text-sm text-center">
            <th className="border-l border-r border-b">{productRow.nr}</th>
            <th className="border-l border-r border-b">{productRow.produkti}</th>
            <th className="border-l border-r border-b">{productRow.njesia}</th>
            <th className="border-l border-r border-b">{productRow.sasia}</th>
            <th className="border-l border-r border-b">{productRow.cmimi}</th>
            <th className="border-l border-r border-b">{productRow.cmimiPaTVSH}</th>
            <th className="border-l border-r border-b">{productRow.vleraPaTVSH}</th>
            <th className="border-l border-r border-b">{productRow.percent}</th>
            <th className="border-l border-r border-b">{productRow.TVSH}</th>
            <th className="border-l border-r border-b">{productRow.vlera}</th>
        </tr>
    );
}

export default ProductRow;
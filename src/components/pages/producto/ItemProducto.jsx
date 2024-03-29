import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { borrarProductoAPI, leerProductosAPI } from "../../../helpers/queries";
import { Link } from "react-router-dom";
const ItemProducto = ({producto, setProductos}) => {


  const borrarProducto = ()=>{
    Swal.fire({
      title: "¿Estas seguro de eliminar el producto?",
      text: "No puedes revertir este proceso posteriormente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {

        const respuesta = await borrarProductoAPI(producto._id)
        if(respuesta.status === 200){
          //falta actualizar la tabla
         const productosActualizados = await leerProductosAPI();
         setProductos(productosActualizados);

          Swal.fire({
            title: "Producto eliminado",
            text: `El producto "${producto.nombreProducto}" fue eliminado correctamente`,
            icon: "success"
          });
        }else{
          Swal.fire({
            title: "Ocurrio un error",
            text: `El producto "${producto.nombreProducto}" no fue eliminado, intente realizar esta operación en unos minutos`,
            icon: "error"
          });
        }

      }
    });
  }

  return (
    <tr>
      <td className="text-center">{producto._id}</td>
      <td>{producto.nombreProducto}</td>
      <td className="text-end">${producto.precio}</td>
      <td className="text-center">
        <img
          src={producto.imagen}
          className="img-thumbnail"
          alt="capuchino"
        ></img>
      </td>
      <td>{producto.categoria}</td>
      <td className="text-center">
        <Link variant="warning" className="me-lg-2 btn btn-warning" to={`/administrador/editar/${producto._id}`}>
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Button variant="danger" onClick={borrarProducto}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;

/**
 * Created by mgradob on 12/5/16.
 */
import React from "react";
import Divider from "material-ui/Divider";

export default class LandingView extends React.Component {
    render() {
        return (
            <div className="container">
                <p>
                    El sistema de préstamo de material y equipo en los laboratorios del campus se está
                    actualizando, el nuevo sistema estará disponible vía Web, iOS y Android lo que
                    agilizará los trámites de préstamo y entrega de material, y ayudarán a tener
                    mayor control en la entrega de material. Será necesario que sigas los siguientes pasos:
                </p>
                <ul>
                    <li>En la página labs.chi.itesm.mx, registrar tu usuario (correo institucional) y
                        contraseña.
                    </li>
                    <li>Acudir al laboratorio con tu credencial para realizar la validación de tu cuenta.</li>
                </ul>
                <p>Con tu cuenta tendrás acceso a:</p>
                <ul>
                    <li>Consultar el material disponible en cada laboratorio</li>
                    <li>Realizar pedidos de material y/o equipo</li>
                    <li>Consultar tu historial</li>
                </ul>
                <br/>

                <h2>Pedido en línea</h2>
                <Divider />
                <p>
                    Una vez localizados los componentes que desees, los puedes agregar a una lista de pedido y terminada
                    tu selección, enviar la solicitud de préstamo. El sistema enviará una
                    notificación al laboratorista para que prepare el material que fue solicitado y te mande un
                    aviso cuando esté listo para que puedas pasar por él. Es necesario que al pasar por tu
                    material lleves tu credencial para poder registrar tu pedido, sin la credencial no se te podrá
                    entregar el material que solicitaste.
                </p>
                <br/>

                <h2>Revisar Historial</h2>
                <Divider />
                <p>
                    Con esta opción podrás revisar la lista de materiales o equipo que has pedido o tienes
                    prestados, te sentildealará que tienes pendientes de entregar y las fechas de solicitud y
                    entrega de material.
                </p>
                <br/>

                <h2>Reserva de Material</h2>
                <Divider />
                <p>
                    Con el nuevo sistema de préstamo de laboratorio, al realizar un pedido contarás con un
                    plazo de 3 días de reservación de material. Si al pasar los 3 días no recogiste tu
                    pedido, se borrará y tendrás que realizar de nuevo el proceso de solicitud.
                </p>
            </div>
        );
    };
}

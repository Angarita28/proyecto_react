import { useEffect, useState } from 'react';
import '../DashboardPage/DashboardPage.css';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';


export default function HeadersExample() {
    const navigate = useNavigate();
    const [auxiliares, setAuxiliares] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAux, setSelectedAux] = useState(null);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
        }
    };

    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás recuperar este registro!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteDoc(doc(db, 'usuarios', id));
                setAuxiliares(auxiliares.filter(a => a.id !== id));
                Swal.fire('Eliminado', 'Registro eliminado correctamente.', 'success');
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
            }
        }
    };

    const handleEdit = (aux) => {
        setSelectedAux(aux);
        setShowModal(true);
    };

    const handleSaveChanges = async () => {
        try {
            const auxRef = doc(db, 'usuarios', selectedAux.id);
            await updateDoc(auxRef, {
                nombres: selectedAux.nombres,
                apellidos: selectedAux.apellidos,
                cedula: selectedAux.cedula,
                telefono: selectedAux.telefono,
                email: selectedAux.email,
                fechaNacimiento: selectedAux.fechaNacimiento,
                sexo: selectedAux.sexo,
                estado: selectedAux.estado
            });

            setAuxiliares(auxiliares.map(a =>
                a.id === selectedAux.id ? selectedAux : a
            ));

            setShowModal(false);
            Swal.fire('Actualizado', 'Los datos fueron actualizados.', 'success');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'No se pudo actualizar.', 'error');
        }
    };

    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setSelectedAux({
            ...selectedAux,
            [name]: value
        });
    };

    useEffect(() => {
        const fetchAuxiliares = async () => {
            const querySnapshot = await getDocs(collection(db, 'usuarios'));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAuxiliares(data);
        };
        fetchAuxiliares();
    }, []);

    return (
        <>
            <header className="p-3 text-bg-dark border-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                                <use xlinkHref="#bootstrap" />
                            </svg>
                        </a>
                        <ul className="nav me-auto mb-2 mb-md-0">
                            <li className="nav-link px-2 text-primary">Bienvenido</li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <a href="#users" className="nav-link px-2 text-primary me-2">Usuarios</a>
                            <button onClick={handleLogout} className="btn btn-primary">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
                <p className="fs-1 text-primary fw-bold">Bienvenido a la interfaz</p>
            </div>

            <main className="main-content">
                <Container className="mt-4" id='users'>
                    <h2 className="page-title text-center mb-4" src="#users">
                        Usuarios Registrados
                    </h2>
                    <div className="table-container">
                        <Table striped bordered hover responsive className="tabla-auxiliares">
                            <thead>
                                <tr>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Cédula</th>
                                    <th>Teléfono</th>
                                    <th>Email</th>
                                    <th>Fecha Nacimiento</th>
                                    <th>Sexo</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auxiliares.map(aux => (
                                    <tr key={aux.id}>
                                        <td>{aux.nombres}</td>
                                        <td>{aux.apellidos}</td>
                                        <td>{aux.cedula}</td>
                                        <td>{aux.telefono}</td>
                                        <td>{aux.email}</td>
                                        <td>{aux.fechaNacimiento || '-'}</td>
                                        <td>{aux.sexo || '-'}</td>
                                        <td>{aux.estado || 'Pendiente'}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    onClick={() => handleEdit(aux)}
                                                >
                                                    <FaEdit /> 
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleEliminar(aux.id)}
                                                >
                                                    <FaTrash /> 
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </main >

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAux && (
                        <Form>
                            <Form.Group className="mb-2">
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombres"
                                    value={selectedAux.nombres}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="apellidos"
                                    value={selectedAux.apellidos}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Cédula</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cedula"
                                    value={selectedAux.cedula}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefono"
                                    value={selectedAux.telefono}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={selectedAux.email}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Fecha de Nacimiento</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fechaNacimiento"
                                    value={selectedAux.fechaNacimiento || ''}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Sexo</Form.Label>
                                <Form.Select
                                    name="sexo"
                                    value={selectedAux.sexo || ''}
                                    onChange={handleModalChange}
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Estado</Form.Label>
                                <Form.Select
                                    name="estado"
                                    value={selectedAux.estado || 'Pendiente'}
                                    onChange={handleModalChange}
                                >
                                    <option>Pendiente</option>
                                    <option>Activo</option>
                                    <option>Inactivo</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

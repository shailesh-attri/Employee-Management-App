import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, Modal, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/Slices/employeeSlice';

const InputField = React.memo(({ name, value, handleChange, placeholder }) => {
    return (
        <View style={styles.inputWrapper}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={(val) => handleChange(name, val)}
                placeholder={placeholder}
                placeholderTextColor={"gray"}
                autoFocus={false}
            />
        </View>
    );
});

const AddDetails = () => {
    const [formData, setFormData] = useState({
        employeeName: '',
        employeeId: '',
        designation: '',
        mobileNo: '',
        dob: '',
        joiningDate: '',
        salary: '',
        address: '',
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalSuccess, setModalSuccess] = useState(false);

    const handleChange = useCallback((name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }, []);
    
    const dispatch = useDispatch();
    const addEmployeeStatus = useSelector((state) => state.addEmployee.status);

    const validateForm = () => {
        const { employeeName, employeeId, designation, mobileNo, dob, joiningDate, salary, address } = formData;

        if (!employeeName || !employeeId || !designation || !mobileNo || !dob || !joiningDate || !salary || !address) {
            return 'All fields are required';
        }

        // Example validation: Mobile number should be 10 digits
        if (!/^\d{10}$/.test(mobileNo)) {
            return 'Mobile number must be 10 digits';
        }

        // Add more validation rules as needed

        return null;
    };

    const handleRegister = () => {
        const validationError = validateForm();
        if (validationError) {
            Alert.alert('Validation Error', validationError);
            return;
        }

        const employeeData = {
            employeeName: formData.employeeName,
            employeeId: formData.employeeId,
            designation: formData.designation,
            phoneNumber: formData.mobileNo,
            dateOfBirth: formData.dob,
            joiningDate: formData.joiningDate,
            activeEmployee: true,
            salary: formData.salary,
            address: formData.address,
        };
        
        setModalVisible(true);  // Show modal
        setModalSuccess(false); // Reset success status
        setModalMessage('Loading...'); // Set initial loading message
        
        dispatch(addEmployee(employeeData))
            .then(() => {
                if (addEmployeeStatus === 'succeeded') {
                    setModalMessage('Registration Successful');
                    setModalSuccess(true);
                    setFormData({
                        employeeName: '',
                        employeeId: '',
                        designation: '',
                        mobileNo: '',
                        dob: '',
                        joiningDate: '',
                        salary: '',
                        address: '',
                    });
                } else if (addEmployeeStatus === 'failed') {
                    setModalMessage('Registration Failed');
                    setModalSuccess(false);
                }
            })
            .finally(() => {
                setTimeout(() => setModalVisible(false), 2000); // Close modal after 2 seconds
            });
    };

    const upperCase = (str) => {
        return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Add a new Employee</Text>
            </View>
            {Object.keys(formData).map((key) => (
                <View key={key} style={styles.inputContainer}>
                    <Text style={styles.label}>{upperCase(key)}</Text>
                    <InputField
                        name={key}
                        value={formData[key]}
                        handleChange={handleChange}
                        placeholder={`Enter ${upperCase(key)}`}
                    />
                </View>
            ))}
            <Pressable
                onPress={handleRegister}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    {addEmployeeStatus === 'loading' ? 'Loading...' : 'Submit'}
                </Text>
            </Pressable>

            {/* Modal for showing loading/spinner and messages */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {addEmployeeStatus === 'loading' ? (
                            <ActivityIndicator size="large" color="#FFA500" />
                        ) : (
                            <>
                                <Text style={[styles.modalMessage, modalSuccess ? styles.successMessage : styles.failureMessage]}>
                                    {modalMessage}
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default AddDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10,
    },
    header: {
        padding: 10,
    },
    headerText: {
        color: 'orange',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginVertical: 7,
    },
    inputWrapper: {
        flex: 1,
    },
    label: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    input: {
        padding: 10,
        borderColor: "#D0D0D0",
        borderWidth: 1,
        marginTop: 5,
        borderRadius: 5,
        color: 'white',
    },
    button: {
        backgroundColor: "#FFA500",
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    buttonText: {
        fontWeight: "bold",
        color: "white",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        border: '1px solid gray'
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalMessage: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    successMessage: {
        color: 'green',
    },
    failureMessage: {
        color: 'red',
    },
});

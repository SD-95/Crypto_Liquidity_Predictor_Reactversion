import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios';

const Prediction_input = () => {

    type PredictionResult = {
        liquidity_level: string;
        confidence_score: number;
        investment_advice: string;
    };
    const [result, setResult] = useState<PredictionResult | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value === '' ? 0 : parseFloat(value),
        });
    };

    const handlePredict = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // stop page reload
        try {
            const response = await axios.post('http://localhost:5000/predict', formData);
            setResult(response.data);
        } catch (error) {
            console.error('Prediction error:', error);
        }
    };



    const [formData, setFormData] = useState({
        price: '',
        price_1h: '',
        price_24h: '',
        price_7d: '',
        volume_24h: '',
        market_cap: ''
    });

    const renderRecommendationBox = (advice: string) => {
        const cleaned = advice.toLowerCase().trim();

        let styleProps = {
            backgroundColor: '',
            borderColor: '',
            textColor: '',
            message: '',
            iconClass: '',
        };

        if (cleaned === 'buy') {
            styleProps = {
                backgroundColor: '#d4edda',
                borderColor: '#28a745',
                textColor: '#28a745',
                message: '✅ Recommended to Buy',
                iconClass: 'bi bi-check-circle-fill text-success',
            };
        } else if (cleaned === 'hold') {
            styleProps = {
                backgroundColor: '#fff3cd',
                borderColor: '#ffc107',
                textColor: '#856404',
                message: '⚠️ Recommended not to purchage',
                iconClass: 'bi bi-exclamation-circle-fill text-warning',
            };
        } else {
            styleProps = {
                backgroundColor: '#f8d7da',
                borderColor: '#dc3545',
                textColor: '#dc3545',
                message: '❌ Not Recommended to Buy',
                iconClass: 'bi bi-x-circle-fill text-danger',
            };
        }

        return (
            <div
                className="mt-4 p-4 text-center rounded"
                style={{
                    backgroundColor: styleProps.backgroundColor,
                    border: `2px solid ${styleProps.borderColor}`,
                }}
            >
                <h5 className="fw-bold" style={{ color: styleProps.textColor }}>
                    {styleProps.message}
                </h5>
                <i className={`fs-1 ${styleProps.iconClass}`}></i>
            </div>
        );
    };


    return (
        <React.Fragment>
            {/* <!-- Prediction Input Form --> */}
            <section id="predict" className="py-5">
                <Container>
                    <h2 className="mb-4">Enter Cryptocurrency Metrics</h2>
                    <Form id="predictForm" onSubmit={handlePredict}>
                        <Row className="g-3">
                            {Object.entries(formData).map(([key, value]) => (
                                <Col md={4} key={key}>
                                    <Form.Group controlId={key}>
                                        <Form.Label>{key.replace(/_/g, ' ').toUpperCase()}</Form.Label>
                                        <Form.Control
                                            type="number"
                                            step="any"
                                            name={key}
                                            value={value}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            ))}
                            <Col xs={12} className="mt-3">
                                <Button variant="primary" className="w-100" type='submit'>
                                    Predict Liquidity
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    {/* Prediction Output */}
                    <div id="result" className="mt-5" style={{ display: result ? 'block' : 'none' }}>
                        <Card className="shadow-lg border-0">
                            {result && (
                                <Card.Body>
                                    <h4 className="card-title mb-3 text-center">📊 Prediction Summary</h4>
                                    <Row className="text-center">
                                        <Col md={4} className="mb-3">
                                            <div className="border rounded p-3 bg-light">
                                                <h6>Liquidity Level</h6>
                                                <p id="liquidity" className={`fw-bold fs-5 text-${result.liquidity_level.toLowerCase() === 'high' ? 'success' : 'danger'}`}>{result.liquidity_level}</p>
                                            </div>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <div className="border rounded p-3 bg-light">
                                                <h6>Confidence Score</h6>
                                                <p id="confidence" className="fw-bold fs-5 text-warning">{result.confidence_score}%</p>
                                            </div>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <div className="border rounded p-3 bg-light">
                                                <h6>Investment Advice</h6>
                                                <p id="advice" className="fw-bold fs-5" style={{
                                                    color:
                                                        result.liquidity_level.toLowerCase() === 'high'
                                                            ? '#28a745'
                                                            : result.liquidity_level.toLowerCase() === 'medium'
                                                                ? '#ffc107'
                                                                : '#dc3545',
                                                }}>{result.investment_advice}</p>
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Recommendation Box */}
                                    {renderRecommendationBox(result.investment_advice)}
                                </Card.Body>
                            )}
                        </Card>
                    </div>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default Prediction_input

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      marginTop: '2rem',
    },
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Sign In', 'Shipping', 'Payment', 'Place Order'];
}

const CheckoutSteps = ({ history }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set([0]));
  const steps = getSteps();
  useEffect(() => {
    if (window.location.pathname === '/payment') {
      setCompleted(new Set([0, 1]));
    } else if (window.location.pathname === '/placeorder') {
      setCompleted(new Set([0, 1, 2]));
    }
  }, []);

  const handleStep = (step) => () => {
    if (step === 1) {
      history.push('/shipping');
    } else if (step === 2) {
      history.push('/payment');
    } else if (step === 3) {
      history.push('/placeorder');
    }
    setActiveStep(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;

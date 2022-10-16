import React from 'react'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    let obj = props.obj;
    let allData = JSON.parse(localStorage.getItem('forge_sheet'));
    let fileNum = allData.findIndex(obj=>obj.name === value);
    let date = new Date();

    console.log(date.toISOString().split('T')[0]);
 
    allData[fileNum].data.push(obj);
    localStorage.setItem('forge_sheet', JSON.stringify(allData));

    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      onClose={handleCancel}
      {...other}
    >
      <DialogTitle>存入...</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          row
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {props.options.map((option) => (
            <FormControlLabel
              value={option.name}
              key={option.name}
              control={<Radio />}
              label={option.name}
            />
          ))}
        </RadioGroup>
      </DialogContent>
  
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          取消
        </Button>
        <Button onClick={handleOk}>確定</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function ConfirmationDialog(props) {
  const options = JSON.parse(localStorage.getItem('forge_sheet'));
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(options[0].name);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <div>
        <Button
          button
          divider
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="phone ringtone"
          onClick={handleClickListItem}
        >
          存入...
        </Button>

        <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}

          obj={props.obj}
          options={options}
        />
    </div>

  );
}

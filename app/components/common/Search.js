/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router'

const filter = createFilterOptions();

export default function SearchBar({ list, setKeyword }) {
  const [value, setValue] = React.useState(null);

  const router = useRouter()

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        size="small"
        onChange={(event, newValue) => {
          if (newValue && newValue.inputValue) {
            router.push(`/add/${newValue.inputValue}`)
          } else {
            // Picked choice
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={list}
        onInputChange={(event, value) => {
          setKeyword(value)
        }}
        onOpen={(event) => {
        }}
        onClose={() => {
        }}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.title}
        style={{ minWidth: 300, maxWidth: 500, width: '100%' }}
        freeSolo
        renderInput={(params) => (
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item xs={true}>
              <TextField
                {...params}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        )}
      />
    </React.Fragment>
  );
}
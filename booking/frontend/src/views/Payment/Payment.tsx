/*
 * Copyright (c) 2020-2020. AxonIQ
 *
 * Licensed under the Apache License, Version 2.0 (the &quot;License&quot;)
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { pay } from "../../services/payment/payment";

export type PaymentRouteParams = {
  accountId: string;
};

export const Payment = () => {
  const { accountId } = useParams<PaymentRouteParams>();
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(accountId, amount);
    try {
      await pay({
        accountId,
        totalAmount: amount,
      });
      alert(`Sucessfully paid! Thank you for your stay.`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Typography variant="h5">Please pay for your stay</Typography>

      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid item lg={4} sm={12}>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
                fullWidth
                required
                autoFocus
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div className="register__actions">
              <Button type="submit" color="primary" variant="contained">
                Pay
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

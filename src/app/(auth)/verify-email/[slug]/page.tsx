"use client";
import { LabelImportant } from "@mui/icons-material";
import {
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  Button,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { use } from "react";
import { InfoBox } from "./_components/InfoBox";

export default function VerifyEmailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const t = useTranslations();
  const { slug: email } = use(params);

  const stepsCheckEmail: string[] = [
    t("VerifyEmailPage.stepsCheckEmail.steps.1"),
    t("VerifyEmailPage.stepsCheckEmail.steps.2"),
    t("VerifyEmailPage.stepsCheckEmail.steps.3"),
  ];

  const importantInfoItems: string[] = [
    t("VerifyEmailPage.important.infoSteps.1"),
    t("VerifyEmailPage.important.infoSteps.2"),
  ];

  return (
    <>
      <InfoBox title={t("VerifyEmailPage.stepsCheckEmail.title")}>
        <List>
          {stepsCheckEmail.map((item) => (
            <ListItem key={item}>
              <ListItemIcon>
                <LabelImportant />
              </ListItemIcon>
              <ListItemText secondary={item} />
            </ListItem>
          ))}
        </List>
      </InfoBox>
      <InfoBox title={t("VerifyEmailPage.verificationAddress.title")}>
        <ListItem
          secondaryAction={
            <Button color="primary" variant="contained">
              {t("VerifyEmailPage.verificationAddress.buttonLabel")}
            </Button>
          }
        >
          <ListItemIcon>
            <LabelImportant />
          </ListItemIcon>
          <ListItemText
            primary={t("VerifyEmailPage.verificationAddress.question")}
            secondary={t("VerifyEmailPage.verificationAddress.suggestion")}
          />
        </ListItem>
      </InfoBox>
      <InfoBox title={t("VerifyEmailPage.important.title")}>
        <List>
          {importantInfoItems.map((item) => (
            <ListItem key={item}>
              <ListItemIcon>
                <LabelImportant color="warning" />
              </ListItemIcon>
              <ListItemText secondary={item} />
            </ListItem>
          ))}
        </List>
      </InfoBox>
      <InfoBox title={t("VerifyEmailPage.important.alreadyVerified.title")}>
        <ListItem
          secondaryAction={
            <Button color="primary" variant="contained">
              {t("VerifyEmailPage.important.alreadyVerified.buttonLabel")}
            </Button>
          }
        >
          <ListItemIcon>
            <LabelImportant />
          </ListItemIcon>
          <ListItemText
            secondary={t("VerifyEmailPage.important.alreadyVerified.content")}
          />
        </ListItem>
      </InfoBox>
    </>
  );
}
